/* eslint "quotes": ["warn", "single"] */

var express = require('express');
var router = express.Router();


// User side pages -----

router.get('/', function (req, res) {
    res.render('selectseat');
});

router.get('/contact', function (req, res) {
    res.render('contact',  {
        status: false
    });
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/logout', function (req, res) {
    res.redirect('/');
});

// -----

// Admin routes -----

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {
    //- console.log(req.body);
    if (req.body.username == 'nuke' && req.body.password == 'nuke') {
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            failure: true
        });
    }

});





// Data Routes -----

// var async = require('async')

// Require controller modules.
var user_controller = require('./controllers/userController');





/// user ROUTES ///



// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);
router.post('/user/login', user_controller.user_login_post);


// DEV Routes -----

router.get('/selectseat', function (req, res) {
    res.redirect('/');
});

router.get('/genmap', function (req, res) {
    res.render('genmap');
});

var booker = require('./controllers/booker');

router.get('/create/seats', booker.createSeatsGet);
router.post('/book/seats', booker.createBookingPost);
router.get('/create/room', booker.createRoomGet);
router.get('/search/seats', booker.searchSeats);

router.get('/selectpeople', function (req, res) {
    res.render('selectpeople');
});

router.get('/finecheck',function(req,res){
    res.render('finecheck');
});

router.get('/logout',function(req,res){
    res.render('logout');
});

router.get('/cancelseats',function(req,res){
    res.render('cancelseats');
});

router.get('/register',function(req,res){
    res.render('register');
});
router.get('/login',function(req,res){
    res.render('login');
});

router.get('/search/user', user_controller.user_search_get);




































//export this router to use in our index.js
module.exports = router;

