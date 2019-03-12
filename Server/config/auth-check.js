const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret =  require('../config/settings').development.secret;

module.exports = (req, res, next) => {
  var token = req.headers['x-access-token'];
    if(!token) {
      return res.status(401).send({
        auth:false,
        message:'No token provided'
      })
    }

    jwt.verify(token,secret, function(err, decoded) {
      if(err) {
        return res.status(500).send({
          auth:false,
          message:'Failed to authenticate token.'
        });
      }
      //res.status(200).send(decoded);
      const userId = decoded.sub
      User
        .findById(userId)
        .then(user => {
          if (!user) {
            return res.status(401).end()
          }

          req.user = user

          return next()
        })
    })
}
