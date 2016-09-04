var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.send('Index');
  // models.User.findAll({
  //   include: [ models.Task ]
  // }).then(function(users) {
  //   res.render('index', {
  //     title: 'Sequelize: Express Example',
  //     users: users
  //   });
  // });
});

module.exports = router;
