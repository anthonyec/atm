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
  return '\x0e\n' + options.fn(this) + '\n\x0f';
});

Handlebars.registerHelper('b', function(options) {
  // byte 16 - 17
  return '\x10' + options.fn(this) + '\x11';
});

Handlebars.registerHelper('u', function(options) {
  // byte 18 - 19
  return '\x12' + options.fn(this) + '\x13';
});

Handlebars.registerHelper('img', function(options) {
  // byte 20 - [1-5]
  return '\n\x14\n';
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

