'use strict';

// id, robot_id, file_path

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('templates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      robot_id: Sequelize.INTEGER,
      file_path: Sequelize.STRING,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('templates');
  }
};
