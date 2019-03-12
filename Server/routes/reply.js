const express = require('express')
const authCheck = require('../config/auth-check')
const Comment = require('../models/Comment');
const User = require('../models/User');
const Reply = require('../models/Reply');


const router = new express.Router()

function validateReplyCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.content !== 'string' || payload.content.length < 5) {
    isFormValid = false
    errors.name = 'Comment must be at least 5 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }

}

router.post('/create', authCheck, async (req, res) => {
    const data = req.body
    if (req.user.roles.indexOf('user') > -1 || req.user.roles.indexOf('Admin') > -1) {
        const validationResult = validateReplyCreateForm(data)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        let {content, comment, username} = data;
        console.log(comment);
        let author = await User.findOne({username:username});

        let replyObj = {
            content,
            author:author._id,
            comment
        }

        Reply
        .create(replyObj)
        .then(async (createdReply) => {
            let comment = await Comment.findById(createdReply.comment);
            comment.replies.push(createdReply._id);
            await comment.save();

            res.status(200).json({
            success: true,
            message: 'Reply added successfully.',
            data: createdReply
            })
        })
        .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
            message = 'Comment with the given name already exists.'
            }
            return res.status(200).json({
            success: false,
            message: message
            })
        })
    } else {
        return res.status(200).json({
            success: false,
            message: 'Invalid credentials!'
        })
    }
  });

module.exports = router
