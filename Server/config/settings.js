const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/JSBlog',
    port: 5000,
    secret:'s0m3 r4nd0m str1ng'
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
