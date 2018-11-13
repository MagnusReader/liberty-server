var User = require("../models/User");
var Booking = require("../models/Booking");
var BookingChart = require("../models/BookingChart");

// Handle User create on POST.
exports.user_create_post = function (req, res) {

    var newuser = new User({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
        registration_number: req.body.registration_number,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        course: req.body.course
    });

    newuser.save(function (err) {
        if (err) {
            res.send(false);
            throw err;
        } else {
            res.send(true);
        }
    });


};

exports.user_login_post = function (req, res) {

    User.findOne({
        username: req.body.username
    }).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            if (data.password == req.body.password) {
                res.send(data);
            } else {
                res.send("wrongPassword");
            }
        } else {
            res.send("userNotExist");
        }
    });
};

exports.user_name_get = function (req, res) {

    User.findById(req.query.name).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};



exports.user_search_get = function (req, res) {
    console.log("search user");
    User.find({
        name: {
            $regex: req.query.user,
            $options: "i"
        }
    }).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};

exports.user_search_get_uname = function (req, res) {
    console.log("search user uname");
    console.log(req.query);
    User.find({
        username: {
            $regex: req.query.uname,
            $options: "i"
        }
    }).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};

exports.booking_search_get = function (req, res) {

    User.findOne({
        username: req.query.user,
        // status: true
    }).exec(function (err, user) {

        if (err) {
            res.send(false);
            throw err;
        }

        if (user) {
            Booking.find({
                user: user._id
            }).populate("user seat room").exec(function(err,data){
                if(err){
                    throw err;
                }
                res.send(data);
            });
            
        } else {
            res.send(false);
        }
    });
};



exports.booking_chart_search_get = function (req, res) {

    User.findOne({
        username: req.query.user,
        // status: true
    }).exec(function (err, user) {

        if (err) {
            res.send(false);
            throw err;
        }

        if (user) {
            BookingChart.find({
                user: user._id
            }).populate("user").exec(function(err,data){
                if(err){
                    throw err;
                }
                res.send(data);
            });
            
        } else {
            res.send(false);
        }
    });
};