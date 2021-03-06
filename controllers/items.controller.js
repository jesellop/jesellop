const Item = require('../models/items.model');
const User = require('../models/users.model');
const Sold = require('../models/sold.model');
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
  const { name, longitude, latitude } = req.query
  const criterial = {}
  if (name) {
    criterial.name = new RegExp(name, "i"); /.*${req.query.name}.*/
  }
  if (longitude && latitude) {
    criterial.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        $maxDistance: 5000
      }
    }
  }

  Item.find(criterial)
  .then((items) => {
    res.render('auth/index', { items })
  })
  .catch(err => next(err))
}


module.exports.create = (req, res, next) => {
  res.render('create/form-item');
}

module.exports.doCreate = (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    // images: req.files.map(f => f.path.replace('public', '')),
    images: req.files ? req.files.map(file => file.secure_url) : '',
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    },
    address: req.body.address,
    owner: req.user.id

  });

  item.save()
    .then((item) => { res.redirect('/user/list') });
  console.log("Funciona el salvado de Items")
}


module.exports.delete = (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/user/list'));
}

module.exports.edit = (req, res, next) => {
  Item.findById(req.params.id)

    .then((item) => {

      res.render('create/form-item-edit', { item })
    })
}

module.exports.doEdit = (req, res, next) => {
  console.info('DATA => ', req.body)

  Item.findByIdAndUpdate(req.params.id, {
    $set: req.body, location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
  })
    .then(() => res.redirect('/user/list'))


}

module.exports.details = (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, { $inc: { views: +1} })
    .then(item => {
      
      User.findById(item.owner)
        .then((user) => res.render('auth/item', { item, user }))
        .catch(err => next(err))
    })
}

module.exports.sold = (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => {
      const sold = new Sold({
        name: item.name, price: item.price, description: item.description, category: item.category, owner: item.owner, images: item.images
      })
      console.log('funciona')

      sold.save();
      console.log('guardado')
    })
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/user/list'));
}
