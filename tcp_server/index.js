var net = require('net');
var dns = require('dns');
var sampleBytes = require('./sample_bytes.js');
var bytes = new Buffer(sampleBytes);

// console.log(bytes);

var server = net.createServer(function(socket) {
  socket.write(new Buffer([18, 42, 255, 384/8]));
  socket.write(bytes);
  socket.pipe(socket);
  // socket.destroy();

  /*
  for (int rowStart=0; rowStart < h; rowStart += 256) {
    int chunkHeight = ((h - rowStart) > 255) ? 255 : (h - rowStart);
    writeBytes(18, 42);
    writeBytes(chunkHeight, w/8);
    for (int i=0; i<((w/8)*chunkHeight); i++) {
      PRINTER_PRINT(pgm_read_byte(bitmap + (rowStart*(w/8)) + i));
    }
  }
  */

  socket.on('error', function(err) {
    if (err.code == 'ECONNRESET') {
      console.log('Ending current session of client');
    }
  });

  socket.on('end', function() {
    console.log('Connected ended ');
    socket.destroy();
  });

  socket.on('close', function() {
    console.log('Connection closed');
    socket.destroy();
  });

  socket.on('data', function (buffer) {
    console.log('Received data', buffer);
    // socket.destroy();
  });
});

server.listen(2000, '0.0.0.0', function() {
  console.log('Server started on port :2000');
});

dns.lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Computer IP: ' + add);
});
