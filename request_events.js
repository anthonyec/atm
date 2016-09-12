const co = require('co');
const { sample } = require('lodash');

const requestManager = require('./utils/request_manager');
const generatePrediction = require('./predictions/generate_prediction.js');
const getController = require('./predictions/get_controller.js');
const Receipt = require('./models/receipt');
const Prediction = require('./models/prediction');
const Request = require('./models/request');

requestManager.events.on('created', (requestModel) => {
  co(function* () {
    try {
      // The related robot data needs to be fetched from the database
      const request = yield requestModel.load(['robot']);
      const robot = request.related('robot');
      const postcode = request.get('postcode');
      const data = {
        jobId: request.get('id'),
        robotName: robot.get('name')
      };

      const predictions = yield Prediction.forge()
        .where({ robotId: robot.get('id') })
        .fetchAll();

      const prediction = sample(predictions.toJSON());
      const controllerName = prediction.controller;

      prediction.controller = getController(controllerName);

      const output = yield generatePrediction(postcode, prediction, data);
      const receipt = Receipt.forge({
        output,
      })

      const receiptModel = yield receipt.save();
      robot.requestReceiptPrint(receiptModel.get('id'));

      // do something here if requestReceiptPrint returns a error
      // maybe chose another robot to print from?
    } catch(err) {
      console.log(err.toString());
    }
  });
});
