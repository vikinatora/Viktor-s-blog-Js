const express = require('express')
const authCheck = require('../config/auth-check')
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');


const router = new express.Router()

function validateCommentCreateForm(payload) {
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
    const comment = req.body
    if (req.user.roles.indexOf('user') > -1 || req.user.roles.indexOf('Admin') > -1) {
        const validationResult = validateCommentCreateForm(comment)
        if (!validationResult.success) {
            return res.status(200).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
        }

        let {content, post, username} = req.body;
        let author = await User.findOne({username:username});

        let replyObj = {
            content,
            author:author._id,
            post
        }

        Comment
        .create(replyObj)
        .then(async (createdComment) => {
            let post = await Post.findById(createdComment.post);
            post.comments.push(createdComment._id);
            await post.save();

            res.status(200).json({
            success: true,
            message: 'Comment added successfully.',
            data: createdComment
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

router.get('/post/:id', (req, res) => {
    let postId = req.params.id;
    Comment
      .find({post:postId})
      .populate('author')
      .populate({
        path: 'replies',
        populate: { path: 'author' }
      })
      .then(comments => {
        res.status(200).json(comments)
    })
})

router.put('/upvote/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Comment
    .findById(id)
    .then(comment => {
      if (!comment) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let upvotes = comment.upvotes;
      let downvotes = comment.downvotes;

      if (!upvotes.includes(username) && !downvotes.includes(username)) {
        upvotes.push(username)
      } else if (!upvotes.includes(username) && downvotes.includes(username)) {
        upvotes.push(username);
        const index = downvotes.indexOf(username)
        downvotes.splice(index, 1)
      }
      else {
          const index = upvotes.indexOf(username)
          upvotes.splice(index, 1)
      }

      comment.upvotes = upvotes;
      comment.downvotes = downvotes;
      comment
        .save()
        .then((comment) => {
          res.status(200).json({
            success: true,
            message: 'Comment upvoted successfully.',
            data: comment
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.put('/downvote/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Comment
    .findById(id)
    .then(comment => {
      if (!comment) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let downvotes = comment.downvotes;
      let upvotes = comment.upvotes;

      if (!downvotes.includes(username) && !upvotes.includes(username)) {
        downvotes.push(username)
      }
      else if (!downvotes.includes(username) && upvotes.includes(username)) {
        downvotes.push(username);
        const index = upvotes.indexOf(username)
        upvotes.splice(index, 1)
      }
      else{
          const index = downvotes.indexOf(username)
          downvotes.splice(index, 1)
      }

      comment.downvotes = downvotes;
      comment.upvotes = upvotes;
      comment
        .save()
        .then((comment) => {
          res.status(200).json({
            success: true,
            message: 'Comment downvoted successfully.',
            data: comment
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})
module.exports = router
