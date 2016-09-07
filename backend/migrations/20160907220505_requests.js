exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', function (table) {
    table.increments();
    table.integer('robotId');
    table.string('postcode');
    table.string('phoneNumber');
    table.string('status');
    table.text('prediction');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests');
};
