var express = require('express');
var router = express.Router();

/* GET home page. call back function */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baer API Project' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

