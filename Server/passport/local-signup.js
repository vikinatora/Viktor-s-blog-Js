const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const encryption = require('../utilities/encryption')
const secret =  require('../config/settings').development.secret

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {

  const user = {
    password: password.trim(),
    email: email.trim(),
    username: req.body.username.trim()
  }

  User
    .find({email: email})
    .then(users => {
      if (users.length > 0) {
        return done('Email already exists!')
      }

      user.salt = encryption.generateSalt()
      user.password = encryption.generateHashedPassword(user.salt, user.password)
      user.roles = ['user']

      User
        .create(user)
        .then(() => {
          
          return done(null)
        })
        .catch(() => {
          return done('There was a problem registering the user.')
        })
    })
})
