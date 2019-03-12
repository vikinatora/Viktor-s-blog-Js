const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let commentSchema = new mongoose.Schema({
    content: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
    author: { type: mongoose.Schema.Types.ObjectId,ref:'User', required: REQUIRED_VALIDATION_MESSAGE },
    post: { type: mongoose.Schema.Types.ObjectId, ref:'Post'},
    dateCreated:{type:mongoose.Schema.Types.Date, default: Date.now},
    upvotes:[{type:mongoose.Schema.Types.String}],
    downvotes:[{type:mongoose.Schema.Types.String}],
    replies:[{type:mongoose.Schema.Types.ObjectId,ref:'Reply'}]

},{usePushEach:true})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment