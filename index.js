/* eslint-env node */

// ----- Initialize Express -----

var express = require('express');
var app = express();




// ----- Configuration -----

var port = process.env.PORT || 3000;

var dbport = 'mongodb://127.0.0.1:27017';
// var dbport = 'mongodb://nuke:nukepassword9@ds145113.mlab.com:45113/nuke';


var routes = require('./routes.js');




// ----- Middleware -----

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(dbport);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -----

var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({
    extended: true
}));

//To parse json data
app.use(bodyParser.json());

// -----

app.set('view engine', 'pug');
app.set('views', './src/views');

// -----

var cors = require('cors');
app.use(cors());

// -----

var favicon = require('serve-favicon');
app.use(favicon('./public/favicon.ico'));

// -----

app.use(express.static('public'));

// -----

app.use('/', routes);

// -----

app.use(function (req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {
             url: req.url
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not fund'
        });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});




// ----- Start listening -----

app.listen(port, function (err) {

    if (err) {
        throw err;
    }
    console.log('App listening on port ' + port);

});
