const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'Write something'
  },
  sender: {
    type: ObjectId
  },
  recipient: {
    type: ObjectId
  }
}, { timestamps: true });

const Msn = mongoose.model('Messages', messageSchema);
module.exports = Msn;