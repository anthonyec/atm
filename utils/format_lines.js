const Handlebars = require('handlebars');
const wrap = require('wordwrapjs');

const regex = /[{{{]{0}(\d+?)[}}}]/g;
var snippets = [];

Handlebars.registerHelper('pre', function(options) {
  const text = options.fn(this);
  const id = snippets.length;
  snippets.push(text);
  return `{{{${id}}}}`;
});

Handlebars.registerHelper('center', function(options) {
  // byte 14 - 15
  return '\x0e' + options.fn(this) + '\x0f';
});

Handlebars.registerHelper('b', function(options) {
  // byte 16 - 17
  return '\x10' + options.fn(this) + '\x11';
});

Handlebars.registerHelper('u', function(options) {
  // byte 18 - 19
  return '\x12' + options.fn(this) + '\x13';
});

Handlebars.registerHelper('size', function(size, options) {
  /*
    Set font size bytes:
    small   hex: \x14  dec: 20
    medium  hex: \x15  dec: 21
    large   hex: \x16  dec: 22
  */
  const startByte = size === 'large' ? '\x16' : '\x15';
  return startByte + options.fn(this) + '\x14';
});

Handlebars.registerHelper('img', function(img, options) {
  /*
    Images:
    eyes        hex: \x17  dec: 23
    happy       hex: \x18  dec: 24
    sad         hex: \x19  dec: 25
    confused    hex: \x1a  dec: 26
    shocked     hex: \x1b  dec: 27
  */

  const bytesMap = {
    'eyes': '\x17',
    'happy': '\x18',
    'sad': '\x19',
    'confused': '\x1a',
    'shocked': '\x1b',
  }

  return bytesMap[img];
});

module.exports = function(text, width) {
  const template = Handlebars.compile(text);
  const wrapped = wrap(template(), {
    width: width || 32,
    break: true
  });

  return wrapped.split('\n').map((line) => {
    const match = line.match(regex);

    if (match) {
      const index = parseInt(match[0].replace('}', ''));
      return snippets[index];
    }

    return line;
  });
};

