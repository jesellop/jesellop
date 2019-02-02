const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Msn = mongoose.model('Messages', messageSchema);
module.exports = Msn;