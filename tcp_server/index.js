var net = require('net');
var bytes = new Buffer([212, 332, 212, 2212, 222]);


var server = net.createServer(function(socket) {
  console.log('Client connected', socket.localAddress);
  socket.write(bytes);

  socket.pipe(socket);
  socket.destroy();

  socket.on('error', function(err) {
    if (ex.code == 'ECONNRESET') {
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
  });
});

server.listen(2000, '0.0.0.0', function() {
  console.log('Server started');
});