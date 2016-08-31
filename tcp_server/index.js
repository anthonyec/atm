var fs = require('fs');
var net = require('net');
var dns = require('dns');
var sampleBytes = require('./sample_bytes.js');
var bytes = new Buffer(sampleBytes);

const Handlebars = require('handlebars');
const wrap = require('wordwrapjs');

Handlebars.registerHelper('center', function(options) {
  return '\x0e\n' + options.fn(this) + '\n\x0f';
});

Handlebars.registerHelper('b', function(options) {
  return '\x10' + options.fn(this) + '\x11';
});

Handlebars.registerHelper('u', function(options) {
  return '\x12' + options.fn(this) + '\x13';
});

const regex = /[{{{]{0}(\d+?)[}}}]/g;

var snippets = [];

Handlebars.registerHelper('pre', function(options) {
  const text = options.fn(this);
  const id = snippets.length;
  snippets.push(text);
  return `{{{${id}}}}`;
});

const file = fs.readFileSync('template.hbs').toString();
const template = Handlebars.compile(file);

const wrapped = wrap(template(), {
  width: 32,
  break: true,
});

const splitted = wrapped.split('\n');

const snippetsInserted = splitted.map((line) => {
  const match = line.match(regex);

  if (match) {
    const index = parseInt(match[0].replace('}', ''));
    return snippets[index];
  }

  return line;
});

var server = net.createServer(function(socket) {
  snippetsInserted.forEach((line) => {
    socket.write(new Buffer(line));
    socket.write(new Buffer('\n'));
    console.log(line);
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
