const Request = sequelize.define('request', {
  postcode: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    field: 'phone_number',
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

module.exports = Request;
