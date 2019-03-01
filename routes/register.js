const express = require('express');
const validator = require('email-validator');
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');
const router = express.Router();

router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name.length < 2 || name.length > 64) {
    res.json({
      success: false,
      error: 'Enter your name',
      fields: ['name']
    });
  } else if (!validator.validate(email)) {
    res.json({
      success: false,
      error: 'Enter correct email',
      fields: ['email']
    });
  } else if (password.length < 5) {
    res.json({
      success: false,
      error: 'Minimum number of characters - 5',
      fields: ['password']
    });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      models.User.create({
        name,
        email,
        password: hash
      })
      .then(user => {
        console.log('New user:', user);
        res.json({
          success: true
        })
      })
      .catch(err => {
        console.log(err);
        res.json({
          success: false,
          error: 'Email is already registered'
        });
      });
    });
  }
});

module.exports = router;
