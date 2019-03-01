const express = require('express');
const validator = require('email-validator');
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');
const router = express.Router();


// Registration
router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    const fields = [];
    if (!name) fields.push('name');
    if (!email) fields.push('email');
    if (!password) fields.push('password');  
  }

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
        req.session.userEmail = email;
        res.json({
          success: true,
          data: {
            name: name,
            email: email
          }
        });
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


// Authorization
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    const fields = [];
    if (!email) fields.push('email');
    if (!password) fields.push('password');  
  }

  models.User.findOne({
    email
  })
  .then(user => {
    if (!user) {
        res.json({
          success: false,
          error: 'Email is not registered',
          fields: ['email']
        });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          res.json({
            success: false,
            error: 'Wrong password',
            fields: ['password']
          });
        } else {
          req.session.userEmail = user.email;
          res.json({
            success: true,
            data: {
              name: user.name,
              email: user.email
            }
          });
        }
    });
    }
  })
  .catch(err => {
    console.log(err);
    res.json({
      success: false,
      error: 'Error. Please, try again'
    });
  });
});


module.exports = router;
