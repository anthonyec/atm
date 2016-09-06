'use strict';

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
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
        Request.belongsTo(models.Robot);
      }
    }
  });

  return Request;
};
