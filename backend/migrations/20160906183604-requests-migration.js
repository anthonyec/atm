'use strict';

// id, postcode, robot, phone_number, status, prediction, created_at

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('requests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      robot_id: Sequelize.INTEGER,
      postcode: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      status: Sequelize.STRING,
      prediction_render: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('requests');
  }
};
