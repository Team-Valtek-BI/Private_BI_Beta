var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Business Partner' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Business Partner' });
});

router.get('/cont', function(req, res, next) {
  res.render('cont', { title: 'Business Partner' });
});


router.get('/pm', function(req, res, next) {
  res.render('pm', { title: 'Business Partner' });
});


router.get('/cont', function(req, res, next) {
  
});

router.get('/foread', function(req, res, next) {
  res.render('foread', { title: 'Business Partner' });
});
module.exports = router;
