var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Monthly Income' });
});

router.get('/register', function(req, res, next){
  res.render('auth', { register: true, title: 'Register new account' })
})

router.post('/register', function(req, res, next){
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function(err){
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    res.redirect('/dashboard');
  })
})

router.post('/login', passport.authenticate('local'), function(req, res, next){
  res.redirect('/dashboard')
})

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/login')
})

router.get('/login', function(req, res, next){
  res.render('auth', { login: true, title: 'Log In' })
})

module.exports = router;
