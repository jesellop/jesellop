const mongoose = require('mongoose');



const favouriteSchema = new mongoose.Schema({

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    //required: true
  },
  
}, { timestamps: true });


  
  const Favourite = mongoose.model('Favourite', favouriteSchema);
  module.exports = Favourite;