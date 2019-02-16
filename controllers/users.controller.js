const Item = require('../models/items.model');
const User = require('../models/users.model');
const Sold = require('../models/sold.model');
const Message = require('../models/messages.model');
const PATH_PIC = '/uploads/'

const Favourite = require('../models/favourite.model')

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

module.exports.createMessages = (req, res, next) => {
  Item.findById(req.params.id)
      .then(item => {
        User.findById(item.owner)
        .then((user) => res.render('user/form-messages', { item, user }))
        .catch(error => next(error))
  });
}

module.exports.send = (req, res, next) => {
  const message = new Message({
    sender: req.user.id,
    recipient: req.body.recipient,
    content: req.body.content,
    item: req.params.itemId
  })

  message.save()
    .then((message) => res.redirect('/user/messages'))
    .catch(error => next(error))
}

module.exports.chat =(req, res, next) => {
  Message.find({
    item: req.params.itemId,
    $or: [
      {recipient: req.user.id, sender: req.params.other_id}, 
      {sender: req.user.id, recipient: req.params.other_id}
    ]})
    .populate('item')
    .populate('sender')
    .populate('recipient')
    .then(messages => {
        console.log('MSG=>', messages)
        const user = messages.find(m => m.sender._id.toString() === req.params.other_id).sender;
        res.render('user/chat', { messages, item: messages[0].item, user })
    })
    .catch(error => next(error));
}


module.exports.messages =(req, res, next) => {
  Message.find({ recipient: req.user.id })
  .populate('item')
  .populate('sender')
  .populate('recipient')
  .then(messages => {
    messages = messages
      .filter(m => m.item.owner == req.user.id)
      .reduce((data, message) => {
        const itemId = message.item.id;
        const senderId = message.sender.id;
        if ((!data.ids[itemId]) || (!data.ids[senderId])) {
          data.messages.push(message)
          data.ids[itemId] = true;
          data.ids[senderId] = true;
        }
        return data;
      }, { messages: [], ids: {} }).messages;
    res.render('user/messages', { messages })
  })
  .catch(error => next(error));
}

module.exports.messagesWith = (req, res, next) => {
  Message.find({ sender: req.user.id })
    .populate('item')
    .populate('sender')
    .populate('recipient')
    .then(messages => {
      messages = messages
        .filter(m => m.item.owner != req.user.id)
        .reduce((data, message) => {
          const itemId = message.item.id;
          if (!data.ids[itemId]) {
            data.messages.push(message)
            data.ids[itemId] = true;
          }
          return data;
        }, { messages: [], ids: {} }).messages;
      res.render('user/messages-with', { messages })
    })
    .catch(error => next(error));
}


module.exports.itemMsgs =(req, res, next) => {
const idItem = req.params.id;
Message.find({$and: [{recipient: req.user.id}, {"item": idItem}]})
  .populate('item')
  .populate('sender')
  .populate('recipient')
  .then(messages => {
    messages = messages.reduce((data, message) => {
        const userId = message.sender.id;
        if (!data.ids[userId]) {
          data.messages.push(message)
          data.ids[userId] = true;
        }
        return data;
      }, { messages: [], ids: {}})
      .messages;
    res.render('user/messages', { messages })
  })
  .catch(error => next(error));
}

  

  module.exports.favourite = (req, res, next) => {
    Item.findById(req.params.id)
      .then((item) => {
        const favItem = new Favourite ({
          item: item.id, client: req.user.id
        })
      favItem.save();
    })
    .then(res.redirect('/user/favourite'))
    .catch(err => next(err))
  }

  module.exports.listFavourite =(req, res, next) => {
    Favourite.find({ "client" : req.user.id })
    .populate('item')
    .then((fav) => {
      res.render('user/favourites', { fav })
    })
    .catch(err => next(err))
  }

  module.exports.deleteFav = (req, res, next) => {
    Favourite.findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/user/favourite'))
      .catch(err => next(err))
  }


