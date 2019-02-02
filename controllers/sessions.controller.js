const passport = require('passport');
const mongoose = require('mongoose');

module.exports.index = (req, res, next) => {
  res.render('auth/index');
}

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect(`/user/list`)
        }
      });
    }
  })(req, res, next);
}