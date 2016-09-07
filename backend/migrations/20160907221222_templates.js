exports.up = function(knex, Promise) {
  return knex.schema.createTable('templates', function (table) {
    table.increments();
    table.string('filePath');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('templates');
};
