// Register empty helpers so that handlebars doesn't replace them with blank
// strings. This allows the formatting to be decided later on in the chain. E.g
// utils/format_lines will replace the tags with the necessary bytes for the
// printer or the preview webpage can replace them with the HTML tags.

module.exports = function registerHelpers(Handlebars) {
  Handlebars.registerHelper('pre', function(options) {
    return '{{#pre}}' + options.fn(this) + '{{/pre}}';
  });

  Handlebars.registerHelper('center', function(options) {
    return '{{#center}}' + options.fn(this) + '{{/center}}';
  });

  Handlebars.registerHelper('b', function(options) {
    return '{{#b}}' + options.fn(this) + '{{/b}}';
  });

  Handlebars.registerHelper('u', function(options) {
    return '{{#u}}' + options.fn(this) + '{{/u}}';
  });

  Handlebars.registerHelper('size', function(size, options) {
    return `{{#size "${size}"}}` + options.fn(this) + '{{/size}}';
  });

  Handlebars.registerHelper('img', function(img, options) {
    return `{{#img "${img}"}}{{/img}}`;
  });
}
