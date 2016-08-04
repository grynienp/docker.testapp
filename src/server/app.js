require('dotenv').load();

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var swig = require('swig');

var mainRoutes = require('./routes/index');

var app = express();


swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


app.set('views', path.join(__dirname, './views'));


if (process.env.NODE_ENV !== 'test') {
  var logger = morgan('combined');
  app.use(logger);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '../', 'client')));


app.use('/', mainRoutes);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
