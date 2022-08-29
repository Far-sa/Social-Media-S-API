const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
  res.send('Auth Info..')
})

module.exports = router
