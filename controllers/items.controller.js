const Item = require('../models/items.model');
//const User = require('../models/movies.model');

module.exports.create = (req, res, next) => {
    res.render('create/form-item');
  }

module.exports.doCreate =(req, res, next) => {
   item = new Item(req.body);

   item.save()
  
}

  // module.exports.doCreate = (req, res, next) => {
  //   User.findOne({ email: req.body.email })
  //     .then(user => {
  //       if (user) {
  //         res.render('users/create', {
  //           user: req.body,
  //           errors: { email: 'Email already registered' }
  //         });
  //       } else {
  //         user = new User ({
  //           email: req.body.email,
  //           name: req.body.name,
  //           password: req.body.password,
  //           location: {
  //             type: 'Point',
  //             coordinates: [req.body.longitude, req.body.latitude]
  //           }
  //         });
  //         return user.save()
  //           .then(user => {
  //             res.redirect('/sessions/create');
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       if (error instanceof mongoose.Error.ValidationError) {
  //         res.render('users/create', {
  //           user: req.body,
  //           errors: error.errors
  //         });
  //       } else {
  //         next(error);
  //       }
  //     })
  // }

