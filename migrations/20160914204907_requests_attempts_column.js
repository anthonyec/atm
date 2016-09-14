exports.up = function(knex, Promise) {
  return knex.schema.table('requests', function (table) {
    table.integer('attempts').after('status').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests');
};
