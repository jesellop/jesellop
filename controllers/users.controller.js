const Item = require('../models/items.model');
const User = require('../models/users.model');
const Sold = require('../models/sold.model');

module.exports.list =(req, res, next) => {
  const { email } = res.locals.session
  //console.info('session => ', email)
  Item.find({ "owner" : email })
  .then((items) => {
    console.log("Funciona el listado de Items el usuario logueado")
    res.render('user/list', { items })
  })
  .catch(err => next(err))
}

module.exports.listSold =(req, res, next) => {
  const { email } = res.locals.session
  //console.info('session => ', email)
  Sold.find({ "owner" : email })
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