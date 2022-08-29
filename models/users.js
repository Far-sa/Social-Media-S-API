const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, max: 20, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 4, max: 20 },
  profile_picture: { type: String, default: '' },
  cover_picture: { type: String, default: '' },
  followers: { type: [mongoose.Types.ObjectId], default: [] },
  followings: { type: [mongoose.Types.ObjectId], default: [] },
  isAdmin: { type: Boolean, defaults: false }
})

//TODO Create validations Schema + Pre static methods

module.exports = mongoose.model('User', UserSchema)
