'use strict';

module.exports = function(sequelize, DataTypes) {
  var Robot = sequelize.define('Robot', {
    postcode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'incomplete',
    },
    prediction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Robot.hasMany(models.Request);
      }
    }
  });

  return Robot;
};
