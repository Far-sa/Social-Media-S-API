const { Router } = require('express')

const userController = require('../controllers/user')

const router = new Router()

//@ Description Get a User
//@ Route GET/api/users/:id
router.get('/:id', userController.getUserById)

//@ Description Follow a User
//@ Route GET/api/users/:id
router.put('/follow/:id', (req, res) => {
  res.send('Users Info..')
})

//@ Description update a user
//@ Route PUT/api/users/edit:id
router.put('/edit/:id', userController.updateUser)

//@ Description delete a user
//@ Route DELETE/api/users/remove:id
router.delete('/remove/:id', userController.deleteUser)

module.exports = router
