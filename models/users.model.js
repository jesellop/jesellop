const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  social: {
    googleId: String,
    facebookId: String
  },
  alias: {
    type: String,
     default: 'User'
  },
  image: {
    type: String,
    default: '/images/default-user.jpg'
  }
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
