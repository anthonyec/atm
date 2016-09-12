exports.up = function(knex, Promise) {
  return knex.schema.createTable('robots', function (table) {
    table.increments();
    table.string('name');
    table.string('deviceId');
    table.string('photonName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('robots');
};
