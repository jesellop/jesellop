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
    type: String//mongoose.Schema.Types.ObjectId, //esto tenemos que ver como funciona el desplegable
    //ref: 'true'
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  location: {
    type: String  // hasta tengamos gmaps
      // type: {type: String },
      // coordinates: [Number]
  }, 
  // owner: {
  //   type: ObjectId //revisar esta linea
  // }
}, { timestamps: true });

// itemSchema.pre('save', function(next) {        esto sobra
//     if (this.email === FIRST_ADMIN_EMAIL) {
//       this.role = constants.ROLE_ADMIN;
//     }
  
//     if (this.isModified('password')) {
//       bcrypt.genSalt(SALT_WORK_FACTOR)
//         .then(salt => {
//           return bcrypt.hash(this.password, salt)
//         })
//         .then(hash => {
//           this.password = hash;
//           next();
//         })
//         .catch(error => next(error));
//     } else {
//       next();
//     }
//   });
  
//   itemSchema.methods.checkPassword = function(password) {
//     return bcrypt.compare(password, this.password);
//   }
  
  const Item = mongoose.model('Item', itemSchema);
  module.exports = Item;