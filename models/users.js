const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 4, max: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 4, max: 20 },
    profile_picture: { type: String, default: '' },
    cover_picture: { type: String, default: '' },
    followers: { type: [mongoose.Types.ObjectId], default: [] },
    followings: { type: [mongoose.Types.ObjectId], default: [] },
    isAdmin: { type: Boolean, defaults: false },
    desc: { type: String, defaults: '', max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] }
  },
  { timestamps: true }
)

//TODO Create validations Schema + Pre static methods

module.exports = mongoose.model('User', UserSchema)
