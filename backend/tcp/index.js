const fs = require('fs');
const net = require('net');
const dns = require('dns');
const formatLines = require('./format_lines.js');

var clients = {};

var server = net.createServer((socket) => {
  const ip = socket.remoteAddress;
  clients[ip] = socket;

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
    delete clients[ip];
  });
});

server.listen(2000, '0.0.0.0', () => {
  dns.lookup(require('os').hostname(), (err, ip, fam) => {
    console.log(`[TCP] server started: ${ip}:2000`);
  });
});

