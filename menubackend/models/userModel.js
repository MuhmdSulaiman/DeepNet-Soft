const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,enum: ['admin', 'user'],default: 'user'
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;