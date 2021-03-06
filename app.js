const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
      secret: "xingusales",
      maxAge: 60*60*1000
}));

app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');

app.use('/', indexRouter);
app.use('/admin', adminRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// app.listen(() => {

// }, 3000)

module.exports = app;
