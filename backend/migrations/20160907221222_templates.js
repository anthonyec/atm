exports.up = function(knex, Promise) {
  return knex.schema.createTable('templates', function (table) {
    table.increments();
    table.string('filePath');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('templates');
};
