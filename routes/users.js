const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
  res.send('Users Info..')
})

module.exports = router
