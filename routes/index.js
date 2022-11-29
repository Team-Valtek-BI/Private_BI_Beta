var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Business Partner' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Business Partner' });
});


module.exports = router;
