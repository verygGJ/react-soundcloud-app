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

// Logout
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({
        success: true
      });
    });
  }
});

// Tracks
router.post('/tracks', (req, res) => {
  const email = req.session.userEmail;

  models.Track.findOne({
    email
  })
  .then(track => {
    res.json({
      playlist: track.playlist
    });
  });
});

// Add track
router.post('/add', (req, res) => {
  const email = req.session.userEmail;
  const playlist = {
    id: req.body.track.id,
    title: req.body.track.title,
    image: req.body.track.artwork_url,
    link: req.body.track.stream_url
  };

  models.Track.findOne({
    email
  }, (err, find) => {
    if (err) return console.log(err);

    if (find) {
      models.Track.updateOne(
      {
        email
      },
      {
        $push: {
          playlist
        }
      }, (error, done) => {
        if (error) return console.log(error);

        if (done) {
          res.json({
            success: true
          });
        }
      });
    } else {
      models.Track.create({
        email,
        playlist
      });

      res.json({
        success: true
      });
    }
  });
});

// Remove track
router.post('/remove', (req, res) => {
  const email = req.session.userEmail;
  const trackId = req.body.track.id;

  models.Track.findOneAndUpdate({
    email
  }, {
    $pull: {
      playlist: {
        id: trackId
      }
    }
  }, (err, result) => {
    if (err) {
      res.json({
        success: false
      })
      return console.log(err)
    };

    if (result) {
      res.json({
        success: true
      })
    }
  });
});

module.exports = router;
