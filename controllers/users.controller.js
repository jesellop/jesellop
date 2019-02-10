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

// POST /messages/:itemId
module.exports.send = (req, res, next) => {
  const message = new Message({
    sender: req.user.id,
    recipient: req.body.recipientId,
    content: req.body.content,
    item: req.params.itemId
  })

  message.save()
    .then((message) => res.redirect('/user/messages'))
    .catch(error => next(error))
}

module.exports.messages =(req, res, next) => {
  Message.find({$or: [{recipient: req.user.id}, {sender: req.user.id}]})
    .populate('item')
    .populate('sender')
    .populate('recipient')
    //.distinct('item')
    .then(messages => {
      console.info(messages)
      res.render('user/messages', { messages })
    })
    .catch(error => next(error));
}

// POST /messages/:itemId/users/:userId
module.exports.chat =(req, res, next) => {
  Message.find({
    item: req.params.itemId,
    $or: [
      {recipient: req.user.id, sender: req.params.senderId}, 
      {sender: req.user.id, recipient: req.params.userId}
    ]})
    .populate('item')
    .populate('sender')
    .populate('recipient')
    .then(messages => {
      console.log('CHAT=>', req.params.id)
      console.log('CHAT=>', req.user.id)
      Item.findById(req.params.itemId)
      .then(item => {
        User.findById(req.params.userId)
        .then(user => {
        res.render('user/chat', { messages, item, user })
        })
      })
    })
    .catch(error => next(error));
}


