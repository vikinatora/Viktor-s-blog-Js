const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let replySchema = new mongoose.Schema({
    content: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
    author: { type: mongoose.Schema.Types.ObjectId,ref:'User', required: REQUIRED_VALIDATION_MESSAGE },
    dateCreated:{type:mongoose.Schema.Types.Date, default: Date.now},
    comment:{type: mongoose.Schema.Types.ObjectId,ref:'Comment', required: REQUIRED_VALIDATION_MESSAGE}

},{usePushEach:true})

let Reply = mongoose.model('Reply', replySchema)

module.exports = Reply