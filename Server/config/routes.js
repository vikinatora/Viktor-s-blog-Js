const authRoutes = require('../routes/auth')
const postRoutes = require('../routes/post')
const categoryRoutes = require('../routes/category')
const commentRoutes = require('../routes/comment');
const replyRoutes = require('../routes/reply');



module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/post', postRoutes)
  app.use('/category', categoryRoutes)
  app.use('/comment', commentRoutes)
  app.use('/reply', replyRoutes)



}
