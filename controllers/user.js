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
    res.status(500).json({ message: err.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) res.status(404).json({ message: 'User not found' })

    const validPassword = await bcrypt.compare(user.password, password)
    if (!validPassword) res.status(400).json({ message: 'Invalid password' })

    return res
      .status(200)
      .json({ success: true, user, message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = bcrypt.hash(req.body.password, 10)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    }

    try {
      const user = User.findByIdAndUpdate(req.params.id, { $set: req.body })
      res
        .status(200)
        .json({ success: true, message: 'Updated user successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res
      .status(403)
      .json({ message: 'You do not have permission to update this user' })
  }
}
