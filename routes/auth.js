const { Router } = require('express')

const userController = require('../controllers/user')

const router = new Router()

//@ Description
//@ Route POST/api/users/register
router.post('/register', userController.registerUser)

//@ Description
//@ Route POST/api/users/login
router.post('/login', userController.loginUser)

module.exports = router
