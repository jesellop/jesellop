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
    type: String  // hasta tengamos gmaps
      // type: {type: String },
      // coordinates: [Number]
  }, 
  owner: {
    type: String,
     //revisar esta linea
  }
}, { timestamps: true });


  
  const Item = mongoose.model('Item', itemSchema);
  module.exports = Item;