var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var modRewrite = require('connect-modrewrite');
//var redis = require("redis");
//var precaCaching = require('./precache/precache');
//var client = redis.createClient();

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//precachin service
//setInterval(function() {
//precaCaching();
//}, 50000);


app.use(cookieParser());
app.use(function(req, res, next) {
  /*client.del(req.url, function(err, reply) {
    // console.log(reply + "---------" + urlToClear);
  });*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//prerender middleware
app.use(require('prerender-node').set('prerenderServiceUrl', 'https://pacific-caverns-8760.herokuapp.com/'));
app.use(modRewrite(['!\\.html|\\.woff(2?)|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html']));


/**
 * Development Settings
 */
if (app.get('env') === 'development') {
  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, 'public')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, 'public/.tmp')));
  app.use(express.static(path.join(__dirname, 'public/app')));


  // Error Handling
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
    res.send('error');
  });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}


module.exports = app;
