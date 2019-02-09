const Item = require('../models/items.model');
const User = require('../models/users.model');
const Sold = require('../models/sold.model');
const Message = require('../models/messages.model');
const PATH_PIC = '/uploads/'

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


module.exports.profiles =(req, res, next) => {
  res.render('user/profile');
}

const hasFile = (file, body) => file && (body['image'] = `${PATH_PIC}${file.filename}`)

module.exports.editProfile = (req, res, next) => {
  const { body, file } = req
  hasFile(file, body)
  User.findByIdAndUpdate({ _id: req.params.id }, body)
    .then(user => {
      console.log("profiled edited", user) 
      res.redirect('/items' )
    })
    .catch(error => res.redirect('/user/list'))
}

/**
 * De aquí para abajo debería ir en un controller de messages
 */

module.exports.createMessages = (req, res, next) => {
  Item.findById(req.params.id)
      .then(item => {
        User.findById(item.owner)
        .then((user) => res.render('user/form-messages', { item, user }))
        .catch(error => res.redirect('/user/list'))
  });
}

module.exports.send = (req, res, next) => {
  const msg = new Message(req.body);

  msg.save()
    .then((message) => { res.redirect('/user/messages')
    console.log("Funciona el salvado de Mensajes")
  })
  .catch(error => res.redirect('/user/list'))
    
}

module.exports.messages =(req, res, next) => {
  Message.find().distinct('item')
    .then(messages => {
      Item.populate({item: messages}, {path: "item"}) 
        .then(item => console.info('ITEM => ', item) || res.render('user/messages', { messages, item: item.item }))
        .catch(err => next(err))
  });
}

module.exports.respondMessages = (req, res, next) => {
Message.findById(req.params.id)
.then(message => {
  Item.findById(message, {path: "item"})
        .then(item => {
          User.findById(message, {path: "receiver"})
          .then((user) => res.render('user/form-messages', { message, item, user }))
          .catch(error => res.redirect('/user/list'))
  });
});
    
}