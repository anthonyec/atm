var net = require('net');
var dns = require('dns');
var sampleBytes = require('./sample_bytes.js');
var bytes = new Buffer(sampleBytes);

const wrap = require('wordwrapjs');
const text = '\x0e*****\nCenter this\n*****\n\x0fEnd the centering please';
const wrapped = wrap(text, {
  width: 32,
  break: true,
});

console.log(text);
console.log(wrapped);

var server = net.createServer(function(socket) {
  // socket.write(new Buffer([133]));
  // socket.write(new Buffer('25% of your child is obese.\n\nBut you\'re not a child anymore.\n\nLong gone are the days of strolling through the meadows, nothing to worry about but the ice cream truck leaving a little too soon today.\n\n\n\n'));

  wrapped.split('\n').forEach((line) => {
    socket.write(new Buffer(line));
    socket.write(new Buffer('\n'));
  });

  socket.pipe(socket);

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
