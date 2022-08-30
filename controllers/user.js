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
  //TODO data Validation

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

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res
        .status(200)
        .json({ success: true, message: 'Deleted user successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res
      .status(403)
      .json({ message: 'You do not have permission to delete this user' })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.body.params)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json({ success: true, other })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        res.status(403).json('message : you already follow this user')
      }
      return await user.updateOne({ $push: { followers: req.body.userId } })
      res
        .status(200)
        .json({ success: true, message: 'Deleted user successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(403).json({ message: 'You are not able to follow yourself' })
  }
}
