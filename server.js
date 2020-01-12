const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const bodyParser = require('body-parser');
var connect = require('connect');
const router = express.Router();

app.use(session({cookie: { maxAge: 60000 }}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// DB Config
const db = require('./config/keys').mongoURI;

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hack:8253LJStDtpNfuRa@cluster0-gmlh3.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use('/', require('./routes/index.js'));



app.get('/registerPage', function (req, res, next) {
res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/', function (req, res, next) {
res.sendFile('/views/index.html');
});


// Register
app.post('/registerPage', (req, res) => {
  const { name, username, email, password } = req.body;
  let errors = [];

  if (!name || !email || !username || !password ) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'), {
      name,
      username,
      email,
      password
      
    })
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({ msg: 'Username already exists' });
        res.sendFile(path.join(__dirname, '../views', 'index.html'), {
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
                res.redirect('/users/');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//Login
app.post('/loginPage.html', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/.html',
    failureRedirect: '/users/.html',
    failureFlash: true
  })(req, res, next);
});

// Logout
app.get('/', function (req, res, next) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.listen(process.env.PORT || 3300, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
module.exports = router;