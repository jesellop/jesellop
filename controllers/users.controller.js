const passport = require('passport');

module.exports.list = (req, res, next) => {
  res.render('user/list');
}