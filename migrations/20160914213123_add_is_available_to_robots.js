
exports.up = function(knex, Promise) {
  return knex.schema.table('robots', function(table) {
    table.boolean('isAvailable').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('robots', function(table) {
    table.dropColumn('isAvailable');
  });
};
