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

// const fileExists = file => file ? file.path : ''

module.exports.editProfile = (req, res, next) => {
  const { alias } = req.body
  console.info('DATA => ', req.file || 'default_pic')
  console.info('COSAS => ', req.params.id)
  
User.findByIdAndUpdate({ _id: req.params.id }, { alias: req.body.alias, image: req.file.path.replace('public', '') })

  // User.findById({ _id: req.params.id }, { alias: { "$exists" : false }})
  // .then((user) => {
  //   user.update({"$set": { alias: req.body.alias} })
  // User.findById({ _id: req.params.id }, { image: { "$exists" : false }})
  // .then((user) => {
 
  //   user.update({"$set": { image: req.file.path.replace('public', '')} })
  // User.findById(req.params.id)
  //   .then((user) => {
  //     // findByIdAndUpdate
  //     user.set(req.body);
  //     user.save()
        .then((user) => {
          console.log("profiled edited") 
          res.redirect('/items' )
        })
    // })
    .catch(error => res.redirect('/user/list'))
  }