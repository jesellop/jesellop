const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // content: {
  //   type: [String],
  //   required: true
  // },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true 
  }
}, { timestamps: true });

const Msn = mongoose.model('Messages', messageSchema);
module.exports = Msn;

/**
 * Listar todos los mensajes de un item
 * Ordenar por timestamp 123123123
 * Sender o Receiver => populate para sacar info
 */
