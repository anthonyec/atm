'use strict';

// id, postcode, robot, phone_number, status, prediction, created_at

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('robots', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      photon_id: Sequelize.STRING,
      photon_name: Sequelize.STRING,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('robots');
  }
};
