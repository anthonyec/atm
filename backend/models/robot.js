'use strict';

module.exports = function(sequelize, DataTypes) {
  var Robot = sequelize.define('Robot', {
    name: DataTypes.STRING,
    photonId: DataTypes.STRING,
    photonName: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Robot.hasMany(models.Request);
      }
    }
  });

  return Robot;
};
