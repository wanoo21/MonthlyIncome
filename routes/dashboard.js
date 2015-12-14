var express = require('express');
var passport = require('passport')
var router = express.Router();
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Redirect user if is log out
  if(!req.user) 
    return res.redirect('/login');
  // Render dashboard for logged user
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

module.exports = router;