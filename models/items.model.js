const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: 'true'
  },
  name: {
    type: String,
    required: 'true'
  },
  category: {
    type: String, //esto tenemos que ver como funciona el desplegable
    required: 'true'
  },
  images: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: 'true'
  },

  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number]
  },
  address: {
    type: String,
    required: 'true'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favourites: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

itemSchema.index({ "location": "2dsphere" });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;