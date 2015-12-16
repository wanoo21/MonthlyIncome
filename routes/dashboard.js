var express = require('express');
var passport = require('passport');
var router = express.Router();
var Income = require('../models/income-expediture').Incomes;
var Expediture = require('../models/income-expediture').Expediture;

// Verify user
function isLogin(req, res, next) {
  if(!req.user)
    return res.json({ message: 'You need to log in!' });
  else next()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // Redirect user if is log out
  if(!req.user) {
    req.flash('info', 'Please, log in!');
    return res.redirect('/login');
  }
  // Render dashboard for logged user
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

router.get('/incomes', isLogin, function(req, res, next){
  Income.find({ userID: req.user._id }, function(err, incomes){
    if(err) return next(err)
    res.json(incomes)
  })
});

router.delete('/incomes/:id', isLogin, function(req, res, next){
  Income.remove({ _id: req.params.id }, function(err, incomes){
    if(err) return next(err)
    res.json(incomes)
  })
});

router.post('/incomes', isLogin, function(req, res, next){
  return new Income({
    userID: req.user._id,
    description: req.body.description,
    amount: req.body.amount
  }).save(function(err, income){
    if(err) return next(err);
    res.json(income)
  })
});

router.get('/expeditures', isLogin, function(req, res, next){
  Expediture.find({ userID: req.user._id }, function(err, expediture){
    if(err) return next(err)
    res.json(expediture)
  })
});

router.post('/expeditures', isLogin, function(req, res, next){
  return new Expediture({
    userID: req.user._id,
    description: req.body.description,
    amount: req.body.amount
  }).save(function(err, expediture){
    if(err) return next(err);
    res.json(expediture)
  })
});

router.delete('/expeditures/:id', isLogin, function(req, res, next){
  Expediture.remove({ _id: req.params.id }, function(err, expediture){
    if(err) return next(err)
    res.json(expediture)
  })
});

module.exports = router;