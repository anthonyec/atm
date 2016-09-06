const Request = require('./request');

const Robot = sequelize.define('robot', {
  name: {
    type: Sequelize.STRING,
  },
  photonId: {
    type: Sequelize.STRING,
    field: 'photon_id',
  },
  photonName: {
    type: Sequelize.STRING,
    field: 'photon_name',
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

Robot.hasMany(Request);

module.exports = Robot;
