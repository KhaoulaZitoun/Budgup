var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cozydb = require("cozydb");

/*
    Configuration section.
*/
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));


/*
    Define routes and their handler.
*/
var indexController = require('./server/controllers/index');
app.use(indexController);


cozydb.configure(__dirname, null, function() {
  /*
   Start the HTTP server.
   */
    var server = app.listen(9250, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Cozy tutorial app listening at http://%s:%s', host, port);
  });
});



/*
    Start the HTTP server.
*/
/*var server = app.listen(9250, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Budgup app listening at http://%s:%s', host, port);
});*/
