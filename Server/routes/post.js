const express = require('express')
const authCheck = require('../config/auth-check')
const Post = require('../models/Post')
const Category = require('../models/Category')
const Comment = require('../models/Comment');


const router = new express.Router()

function validatePostCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Post name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.content !== 'string' || payload.content.length < 10 || payload.content.length > 1000) {
    isFormValid = false
    errors.description = 'Content must be at least 10 symbols and less than 1000 symbols.'
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
  const post = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validatePostCreateForm(post)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    let category = await Category.findOne({name:post.category});
    let postObj = {
        title:post.title,
        content:post.content,
        imageUrl:category.imageUrl,
        category:category._id,
    }
    Post
      .create(postObj)
      .then((createdPost) => {

        category.posts.push(createdPost.id);
        category.save()
          .then(()=>{
            res.status(200).json({
              success: true,
              message: 'Post added successfully.',
              data: createdPost
          });
       
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Post with the given name already exists.'
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
})

router.get('/all', (req, res) => {
  Post
    .find()
    .sort([['dateCreated', -1]])
    .populate('category')
    .populate({
      path: 'comments',
      populate: { path: 'author' }
    })
    .then(posts => {
      res.status(200).json(posts)
    })
})

router.get('/:id', (req, res) => {
  let postId = req.params.id;
  Post
    .findById(postId)
    .populate('category')
    .then(post => {
      res.status(200).json({
        success: true,
        message: 'Post found successfully.',
        data: post
    })
  })
  .catch((err) => {
    console.log(err)
    let message = "Can't find post with the given id"
    return res.status(200).json({
      success: false,
      message: message
    })
  })
})

router.put('/edit/:id', authCheck, async (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const postId = req.params.id
    let postObj = req.body
    const validationResult = validatePostCreateForm(postObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    let category = await Category.findOne({name:req.body.category});

    postObj = {
        ...postObj,
        category:category._id,
    }

    Post
      .findById(postId)
      .then(existingPost => {
        existingPost.title = postObj.title
        existingPost.content = postObj.content
        existingPost.category = category._id,

        existingPost
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: 'Post edited successfully.',
              data: editedBook
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Post with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
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
})

router.delete('/delete/:id', authCheck, async (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Post
      .findById(id)
      .then((post) => {    
        Category.findById(post.category)
          .then(category=>{
              let index = category.posts.indexOf(id);
              category.posts.splice(index,1)
              category.save()
                .then(()=>{
                  post.remove()
                  .then(() => {
                  return res.status(200).json({
                    success: true,
                    message: 'Post deleted successfully!'
                    })
                  })
                })
            })
      })
    }
   else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})


router.get('/search/:name', (req, res) => {
  let name = req.params.name;
  Post.find()
    .populate('category')
    .then(post => {
      // post = post.filter(post=>post.title.includes(name));
      res.status(200).json({
        success: true,
        message: 'Posts found successfully.',
        data: post
    })
  })
  .catch((err) => {
    console.log(err)
    let message = "Can't find post with such query"
    return res.status(200).json({
      success: false,
      message: message
    })
  })
})

module.exports = router
