const express = require('express')
const authCheck = require('../config/auth-check')
const Category = require('../models/Category')
const router = new express.Router()

router.post('/create', authCheck, (req, res) => {
  const categoryObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
      const validationResult = validateCategoryCreateForm(categoryObj)
      if (!validationResult.success) {
      return res.status(200).json({
          success: false,
          message: validationResult.message,
          errors: validationResult.errors
      })
      }

      Category
      .create(categoryObj)
      .then((createdCategory) => {
          res.status(200).json({
          success: true,
          message: 'Category added successfully.',
          data: createdCategory
          })
      })
      .catch((err) => {
          console.log(err)
          let message = 'Something went wrong :( Check the form for errors.'
          if (err.code === 11000) {
          message = 'Category with the given name already exists.'
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

router.get('/all', (req, res) => {
  Category
    .find()
    .then(categories => {
      res.status(200).json(categories)
  })
})

function validateCategoryCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Category name must be at least 3 symbols.'
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

module.exports = router
