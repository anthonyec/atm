const fs = require('fs');
const net = require('net');
const dns = require('dns');
const formatLines = require('./format_lines.js');

var server = net.createServer(function(socket) {
  socket.on('error', function(err) {
    if (err.code == 'ECONNRESET') {
      console.log('Ending current session of client');
    }
  });

  socket.on('end', function() {
    console.log('Connected ended');
    socket.destroy();
  });

  socket.on('close', function() {
    console.log('Connection closed');
    socket.destroy();
  });

  socket.on('data', function (buffer) {
    const id = buffer.toString();
    const text = fs.readFileSync(`template_${id}.hbs`).toString();

    formatLines(text).forEach((line) => {
      socket.write(new Buffer(line));
      socket.write(new Buffer('\n'));
    });
    socket.destroy();
  });
});

server.listen(2000, '0.0.0.0', function() {
  console.log('Server started on port :2000');
});

dns.lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Computer IP: ' + add);
});
