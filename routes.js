/* eslint "quotes": ["warn", "single"] */

var express = require('express');
var router = express.Router();


// User side pages -----


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/bookroom.html', function (req, res) {
    res.render('bookroom');
});

router.get('/bookings.html', function (req, res) {
    res.render('bookings');
});

router.get('/fines.html', function (req, res) {
    res.render('fines');
});

router.get('/profile.html', function (req, res) {
    res.render('profile');
});

router.get('/psychometric.html', function (req, res) {
    res.render('psychometric');
});

router.get('/contact.html', function (req, res) {
    res.render('contact');
});

router.get('/about.html', function (req, res) {
    res.render('about');
});

router.get('/login.html', function (req, res) {
    res.render('login');
});

// -----

// Admin routes -----

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
var feedback_controller = require('./controllers/feedbackController');




/// user ROUTES ///



// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);
router.post('/user/login', user_controller.user_login_post);
router.get('/user/name', user_controller.user_name_get);


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

router.get('/finecheck.html', function (req, res) {
    res.render('finecheck');
});

router.get('/cancelseats', function (req, res) {
    res.render('cancelseats');
});

router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/search/user', user_controller.user_search_get);
router.get('/search/user/uname', user_controller.user_search_get_uname);
router.get('/search/user/bookings', user_controller.booking_search_get);
router.get('/booking/delete', booker.delete_booking_get);


router.get('/genbarcode', function (req, res) {
    res.render('genbarcode');
});

router.get('/viewbookings', function (req, res) {
    res.render('viewbookings');
});

router.get('/delete/all/bookings', booker.deleteAllBookingsGet);

router.get('/feedback/all', feedback_controller.feedback_get_all);
router.post('/create/feedback', feedback_controller.feedback_create_post);
router.put('/update/feedback', feedback_controller.feedback_update_status);
































//export this router to use in our index.js
module.exports = router;