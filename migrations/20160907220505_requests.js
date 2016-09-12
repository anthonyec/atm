const consts = require('../models/request').consts;

exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', function (table) {
    table.increments();
    table.integer('robotId');
    table.integer('receiptId');
    table.string('postcode');
    table.string('phoneNumber');
    table.string('status').defaultTo(consts.INCOMPLETE);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests');
};
