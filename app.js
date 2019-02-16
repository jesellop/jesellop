require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const mongoose= require('mongoose');
const passport = require('passport');

require('./configs/passport.config').setup(passport);
require('./configs/db.config');
require('./configs/hbs.config');

const sessionsRouter = require('./routes/sessions.routes');
const usersRouter = require('./routes/users.routes');
const itemsRouter = require('./routes/items.routes')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false })); //quiza no hace falta
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(session({
  secret: 'SuperSecret - (Change it)',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user;
  res.locals.search = {
    name: req.query.name
  }
  next();
})


app.use('/auth', sessionsRouter);
app.use('/user', usersRouter);
app.use('/items', itemsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

