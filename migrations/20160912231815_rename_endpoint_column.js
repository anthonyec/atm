exports.up = function(knex, Promise) {
  return knex.schema.table('predictions', function (table) {
    table.renameColumn('endpoint', 'endpoints');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('templates');
};
