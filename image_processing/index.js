var fs = require('fs');
var gm = require('gm');
var PNGImage = require('pngjs-image');
var Q = require('q');

var saveData = function(data) {
  console.log(data.length);
};

var generateThresholdImage = function(path, output) {
  var deferred = Q.defer();

  gm(path).threshold(50).write(output, function(err, value) {
    if (err) deferred.reject(new Error(err));
    deferred.resolve(value);
  });
  return deferred.promise;
};

/*
  Bulk of this conversion code is ported from Adafruits thermal printer
  library example called bitmapImageConvert.pde
*/
var getImageByteArray = function(path) {
  var deferred = Q.defer();

  PNGImage.readImage('dummy/test.png', function (err, image) {
    if (err) deferred.reject(new Error(err));

    var data = [];
    var width = image.getWidth();
    var height = image.getHeight();
    var rowBytes = Math.floor((width + 7) / 8);
    var totalBytes = Math.floor(rowBytes * height);
    var lastBit;
    var sum;
    var b;
    var x;
    var y;

    for(pixelNum=byteNum=y=0; y<height; y++) {

      // each 8-pixel block within row...
      for(x=0; x<rowBytes; x++) {
        lastBit = (x < rowBytes - 1) ? 1 : (1 << (rowBytes * 8 - width));

        // clear accumulated 8 bits
        sum = 0;

        // each pixel within block...
        for(b=128; b>=lastBit; b>>=1) {
          var isPixelBlack = (image.getAtIndex(pixelNum++) & 1) == 0;

          // if black pixel, set bit
          if(isPixelBlack) sum |= b;
        }

        // dodgy code to make a hex
        var hex = '0x' + sum.toString(16).toUpperCase();
        hex = (hex.length === 3) ? hex + '0' : hex;
        data.push(hex);
      }
    }
    deferred.resolve(data);
  });
  return deferred.promise;
};

getImageByteArray('dummy/test_output_2.png').then(function(data) {
  console.log(data);
});