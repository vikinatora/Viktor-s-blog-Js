const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let categorySchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Category already exists.']},
    imageUrl: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Image already exists.']},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }],
},{usePushEach:true})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category