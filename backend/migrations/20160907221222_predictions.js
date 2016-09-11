exports.up = function(knex, Promise) {
  return knex.schema.createTable('predictions', function (table) {
    table.increments();
    table.integer('robotId');
    table.string('endpoint');
    table.string('templatePath');
    table.string('controller');
    table.boolean('special');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('templates');
};
