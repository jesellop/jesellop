const Item = require('../models/items.model');
const User = require('../models/users.model');
const Sold = require('../models/sold.model');

module.exports.list =(req, res, next) => {
  Item.find({ "owner" : req.user.id })
  .then((items) => {
    console.log("Funciona el listado de Items el usuario logueado")
    res.render('user/list', { items })
  })
  .catch(err => next(err))
}

module.exports.listSold =(req, res, next) => {
  Sold.find({ "owner" : req.user.id })
  .then((sold) => {
    console.log("Funciona el listado de Items vendidos del usuario logueado")
    res.render('user/list-sold', { sold })
  })
  .catch(err => next(err))
}

module.exports.messages = (req, res, next) => {
  res.render('user/messages');
}

module.exports.sendMessages = (req, res, next) => {
  res.render('user/form-messages');
}

module.exports.profiles =(req, res, next) => {
  res.render('user/profile');
}

// const fileExists = file => file ? file.path : ''

module.exports.editProfile = (req, res, next) => {
  const { alias } = req.body
  console.info('DATA => ', req.file || 'default_pic')
  console.info('COSAS => ', req.params.id)
  
  User.findByIdAndUpdate({ _id: req.params.id }, { alias, image: req.file.path.replace('public', '')}, { new: true }) // Revisar el new true
    .then(user => {
      console.log("profiled edited") 
      res.redirect('/items' )
    })
    .catch(error => res.redirect('/user/list'))
}