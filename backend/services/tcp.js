const fs = require('fs');
const net = require('net');
const dns = require('dns');
const formatLines = require('../utils/format_lines.js');

const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    const id = buffer.toString().replace(/\n/g, '');
    const text = fs.readFileSync(`./temp/${id}.hbs`).toString();

    formatLines(text).forEach((line) => {
      socket.write(new Buffer(line));
      socket.write(new Buffer('\n'));
    });

    console.log(`[TCP] sent ${id}.hbs to ${socket.remoteAddress}`);
    socket.destroy();
  });

  socket.on('error', (err) => {
    if (err.code == 'ECONNRESET') {
      console.log('[TCP] ECONNRESET');
    }
  });

  socket.on('end',() => {
    console.log('[TCP] connected ended');
    socket.destroy();
  });

  socket.on('close', () => {
    console.log('[TCP] connection closed');
    socket.destroy();
  });
});

function tcp() {
  return({
    listen,
  });

  function listen(port, callback) {
    // 0.0.0.0 is important because 127.0.0.1 doesnt have loopback or something
    server.listen(port, '0.0.0.0', callback);
  }
}

module.exports = tcp;
