const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User');
const secret =  require('../config/settings').development.secret;

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userToLogin = {
    email: email.trim(),
    password: password.trim()
  }

  User
    .findOne({email: userToLogin.email})
    .then(user => {
      if (!user || !user.authenticate(userToLogin.password)) {
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'
        return done(error)
      }

      const payload = {
        sub: user.id
      }
      const token = jwt.sign(payload, secret)
      const data = {
        username: user.username
      }

      if (user.roles) {
        data.roles = user.roles;
        data.isAdmin = user.roles.indexOf('Admin') != -1;
      }


      return done(null, token, data)
    })
})
