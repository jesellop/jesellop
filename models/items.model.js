const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;
//const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const itemSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: 'Price is required'
  },
  name: {
    type: String,
    required: 'Name is required'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, //esto tenemos que ver como funciona el desplegable
    ref: 'Categories'
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  location: {
      type: {type: String },
      coordinates: [Number]
  }, 
  owner: {
    type: ObjectId //revisar esta linea
  }
}, { timestamps: true });

itemSchema.pre('save', function(next) {
    if (this.email === FIRST_ADMIN_EMAIL) {
      this.role = constants.ROLE_ADMIN;
    }
  
    if (this.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(this.password, salt)
        })
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });
  
  itemSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  
  const Item = mongoose.model('Item', itemSchema);
  module.exports = Item;