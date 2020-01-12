const express = require('express');
const path = require('path');
const router = express.Router();
var async = require("async");
var flash = require('req-flash');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

var crypto = require("crypto");
const mongoose = require('mongoose');
const passport = require('passport');

const session = require('express-session');

const app = express();

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
// Passport Config

app.use(session({
  secret: 'secret',
}));
require('./config/passport')(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.urlencoded({ extended: true }));

// Express session

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});




// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect('mongodb+srv://hack:8253LJStDtpNfuRa@cluster0-gmlh3.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.urlencoded({ extended: true }));

// Express session

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./users.js'));

app.get('/', function (req, res, next) {
 res.sendFile(path.join(__dirname, '/views', 'mainPage.html'));
});

app.get('/loginPage', function (req, res, next) {
 res.sendFile(path.join(__dirname, '/views', 'login.html'));
});


app.get('/registerPage', function (req, res, next) {
 res.sendFile(path.join(__dirname, '/views', 'index.html'))
});



app.listen(process.env.PORT || 3300, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});