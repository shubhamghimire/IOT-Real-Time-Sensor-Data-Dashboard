var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
const helmet = require('helmet');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routers = require('./routes/index');

require('dotenv').config();
var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res, next) {
  res.send('Welcome to realtime backend');
});

app.use('/api/v1/', routers);

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
  res.json({ 
    sucess: false,
    error: res.locals.message
  });
});

module.exports = app;
