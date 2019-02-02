const mongoose = require('mongoose');



const soldSchema = new mongoose.Schema({
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
  picture: {
    type: String
  },
  location: {
    type: String  // hasta tengamos gmaps
      // type: {type: String },
      // coordinates: [Number]
  }, 
  owner: {
    type: String,
     //revisar esta linea
  }
}, { timestamps: true });

const Sold = mongoose.model('Sold', soldSchema);
module.exports = Sold;