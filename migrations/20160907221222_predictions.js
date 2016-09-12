exports.up = function(knex, Promise) {
  return knex.schema.createTable('predictions', function (table) {
    table.increments();
    table.integer('robotId');
    table.string('endpoints');
    table.string('templatePath');
    table.string('controller');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('templates');
};
