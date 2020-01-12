const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth.js');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.sendFile('/mainPage.html'));

// Dashboard
router.get('/', ensureAuthenticated, (req, res) =>
  res.sendFile('/mainPage.html' , {
    user: req.user
  }));


module.exports = router;
