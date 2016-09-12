exports.up = function(knex, Promise) {
  return knex.schema.createTable('receipts', function (table) {
    table.increments();
    table.integer('requestId');
    table.text('output');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('receipts');
};
