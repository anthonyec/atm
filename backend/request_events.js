const co = require('co');
const { sample } = require('lodash');

const requestManager = require('./utils/request_manager');
const Receipt = require('./models/receipt');
const Prediction = require('./models/prediction');

const generatePrediction = require('./predictions/generate_prediction.js');
const tempData = require('./predictions/temp_data.js').predictions;
const Request = require('./models/request');


requestManager.events.on('created', (requestModel) => {
  co(function* () {
    try {
      // Load to fetch related robot data
      const request = yield requestModel.load(['robot']);
      const robot = request.related('robot');
      const postcode = request.get('postcode');
      const data = {
        jobId: request.get('id'),
        robotName: robot.get('name')
      };

      const predictions = yield Prediction
        .forge()
        .where({
          robotId: robot.get('id'),
          special: false,
        })
        .fetchAll();

      const prediction = sample(predictions.toJSON());

      console.log(prediction);

      console.log('[APP] generating prediction');
      const output = yield generatePrediction(postcode, prediction, data);
      const receipt = Receipt.forge({
        output,
      })

      console.log('[APP] saving and printing receipt');
      const receiptModel = yield receipt.save();
      robot.requestReceiptPrint(receiptModel.get('id'));

      // do something here if requestReceiptPrint returns a error
      // maybe chose another robot to print from?
    } catch(err) {
      console.log(err.toString());
    }
  });
});
