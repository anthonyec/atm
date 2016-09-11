const co = require('co');

const requestManager = require('./utils/request_manager');
const Receipt = require('./models/receipt');

const generatePrediction = require('./predictions/generate_prediction.js');
const tempData = require('./predictions/temp_data.js').predictions;
const Request = require('./models/request');

requestManager.events.on('created', (request) => {
  co(function* () {
    try {
      const robot = request.related('robot');
      const postcode = request.get('postcode');
      const data = {
        jobId: request.get('id'),
        robotName: robot.get('name')
      };

      const prediction = yield generatePrediction(postcode, tempData['giraffe'], data);
      const receipt = Receipt.forge({
        output: prediction,
      })

      const receiptModel = yield receipt.save();
      robot.requestReceiptPrint(receiptModel.get('id'));

      console.log('done');
    } catch(err) {
      console.log(err.toString());
    }
  });
});
