const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {

  const user = {
    password: password.trim(),
    username: req.body.username.trim()
  }

  User
    .find({username: username})
    .then(users => {
      if (users.length > 0) {
        return done('Username already exists!')
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
