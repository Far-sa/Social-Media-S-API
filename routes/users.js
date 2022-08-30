const { Router } = require('express')

const router = new Router()

//@ Description Get a User
//@ Route GET/api/users/:id
router.get('/', (req, res) => {
  res.send('Users Info..')
})

//@ Description Follow a User
//@ Route GET/api/users/:id
router.get('/', (req, res) => {
  res.send('Users Info..')
})

//@ Description update a user
//@ Route PUT/api/users/update:id
router.put('/', (req, res) => {
  res.send('Users Info..')
})

//@ Description delete a user
//@ Route DELETE/api/users/update:id
router.delete('/', (req, res) => {
  res.send('Users Info..')
})

module.exports = router
