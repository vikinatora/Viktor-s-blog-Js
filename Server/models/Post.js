const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let postSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Post already exists.']},
  content: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
  imageUrl: {type: mongoose.Schema.Types.String},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
  dateCreated:{type:mongoose.Schema.Types.Date, default : Date.now}
},{usePushEach:true})

let Post = mongoose.model('Post', postSchema)

module.exports = Post