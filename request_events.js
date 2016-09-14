const co = require('co');
const twilio = require('twilio');
const { sample } = require('lodash');

const requestManager = require('./utils/request_manager');
const generatePrediction = require('./predictions/generate_prediction.js');
const getController = require('./predictions/get_controller.js');
const Receipt = require('./models/receipt');
const Prediction = require('./models/prediction');
const Request = require('./models/request');
const isSmsOnlyMode = require('./utils/sms_only_mode.js');

const MAX_ATTEMPTS = 3;
const client = twilio(
  process.env.TWILIO_SID || '',
  process.env.TWILIO_TOKEN || ''
);

var previousRobotId = null;

function sendPredictionInSms(phoneNumber, prediction) {
  if (!phoneNumber || !prediction) {
    //  nothing to sent
  }

  const client = twilio(
    process.env.TWILIO_SID || '123', // add some fake number if env not set
    process.env.TWILIO_TOKEN || '123' // add some fake number if env not set
  );

  client.messages.create({
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER || '123',
    body: prediction,
  }, function(err, message) {
    console.log(message.sid);
  });
}

requestManager.events.on('created', (requestModel) => {
  co(function* () {
    try {
      // Load fetches data forrelations in other tables
      const request = yield requestModel.load(['robot']);
      const robot = request.related('robot');
      const postcode = request.get('postcode');

      // Extra data past to the generatePrediction function
      const data = {
        jobId: request.get('id'),
        robotId: robot.get('name')
      };

      console.log(robot.toJSON());

      const predictions = yield Prediction.forge()
        .where({ robotId: robot.get('id') })
        .fetchAll();

      const prediction = sample(predictions.toJSON());
      const controllerName = prediction.controller;

      // Replace the controller string with the actual funtion
      prediction.controller = getController(controllerName);

      const output = yield generatePrediction(postcode, prediction, data);
      const receipt = Receipt.forge({
        output,
      })

      //  if we were in sms-only mode, just send sms
      if (isSmsOnlyMode()) {
        const phoneNumber = request.get('phoneNumber');
        sendPredictionInSms(phoneNumber, output);
        return;
      }

      const receiptModel = yield receipt.save();
      const receiptId = receiptModel.get('id');

      yield robot.requestReceiptPrint(receiptId).then(() => {
        request.setStatusComplete();
        request.save();
      });

      console.log('[APP] receipt generated', receiptModel.get('id'));

      // do something here if requestReceiptPrint returns a error
      // maybe chose another robot to print from?
    } catch(err) {
      console.log('[APP]', err.toString());

      // If the request fails in any way, the requestModel will get rerouted
      // through the function above again 3 more times until it gives up.
      // To pass it through the function we manually call the "created" event
      // on the requestManager and pass it the same model. Cheeky but yeah....

      var attempts = requestModel.get('attempts');

      if (requestModel.robotId === previousRobotId) {
        console.log('[APP] same robot, retry');
        requestManager.events.emit('created', requestModel);
      }

      if (attempts >= MAX_ATTEMPTS) {
        console.log('[APP] max attempts reached, sending back sad error SMS');

        client.messages.create({
          to: requestModel.get('phoneNumber'),
          from: process.env.TWILIO_PHONE_NUMBER || '123',
          body: 'The Robotic Oracle is having some unforeseen problems right now. Please try again later',
        }, function(err, message) {
          if (err) {
            console.log('[SMS] error sending message', err);
          }
        });

        return false;
      }

      requestManager.getRandomRobot().then((robot) => {
        console.log('[APP] retrying with', robot.name);

        requestModel.set('robotId', robot.id);
        requestModel.set('attempts', attempts+=1);

        requestModel.save().then((model) => {
          requestManager.events.emit('created', model);
        });
      }).catch((err) => {
        console.log('err',err);
      })

    }
  });
});
