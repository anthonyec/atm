const Request = sequelize.define('request', {
  postcode: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    field: 'phone_number',
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
  robot_id: {
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

module.exports = Request;
