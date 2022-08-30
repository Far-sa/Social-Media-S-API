const bcrypt = require('bcryptjs')

const User = require('../models/users')

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword
    })

    await user.save()
    res.send(200).json({ success: true, message: 'User saved' })
  } catch (err) {
    console.log(err)
  }
}
