const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
var flash = require('req-flash');
var async = require("async");
const nodemailer = require('nodemailer');
var crypto = require("crypto");
const passport = require('passport');
// Load User model
const User = require(path.join(__dirname, '/models', 'user.js'));
const { forwardAuthenticated } = require(path.join(__dirname, '/config', 'auth.js'));

// Login Page
router.get('/loginPage', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '/views', 'login.html')));

// Register Page
router.get('/registerPage', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '/views', 'index.html')));

// Register
router.post('/registerPage', (req, res) => {
  const { name, username, email, password } = req.body;
  let errors = [];

  if (!name || !email || !username  || !password ) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.sendFile(path.join(__dirname, '/views', 'index.html'), {
      name,
      username,
      email,
      password
      
    })
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({ msg: 'Username already exists' });
        res.sendFile(path.join(__dirname, '/views', 'index.html'), {
        
          name,
          username,
          email,
          password
        });
      } else {
        const newUser = new User({
          name,
          email,
          username,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
               res.sendFile(path.join(__dirname, '/views', 'login.html'))
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
router.get('/', function (req, res, next) {
res.sendFile(path.join(__dirname, '/views', 'mainPage.html'));
});

router.get('/registerPage', function (req, res, next) {
res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

router.get('/loginPage', function (req, res, next) {
res.sendFile(path.join(__dirname, '/views', 'login.html'));
});
// Login
router.post('/loginPage', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/mainPage.html',
    failureRedirect: '/mainPage.html',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/', function (req, res, next) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.sendFile(path.join(__dirname, '/views', 'mainPage.html'));
});

 
 module.exports = router;
   

   
 
