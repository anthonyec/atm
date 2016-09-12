const fs = require('fs');
const net = require('net');
const dns = require('dns');

const formatLines = require('../utils/format_lines.js');
const Receipt = require('../models/receipt');

function handleReceiveData(buffer) {
  const id = buffer.toString().replace(/\n/g, '');

  Receipt.where({ id }).fetch({ withRelated: ['request'] }).then((receipt) => {
    const output = receipt.get('output');
    const request = receipt.related('request');

    console.log('Receipt time');

    if (request.id) {
      request.setStatusPrinting();
      request.save();
    }

    formatLines(output).forEach((line) => {
      this.write(new Buffer(line));
      this.write(new Buffer('\n'));
    });

    console.log(`[TCP] receipt ${id} to ${this.remoteAddress}`);
  }).catch(() => {
    console.log('[TCP] error fetching receipt');
  }).finally(() => {
    this.destroy();
  });
}

const server = net.createServer((socket) => {
  socket.on('data', handleReceiveData);

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
