var User = require("../models/User");

// Handle User create on POST.
exports.user_create_post = function (req, res) {

    var newuser = new User({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username
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
                res.send(true);
            } else {
                res.send("wrongPassword");
            }
        } else {
            res.send("userNotExist");
        }



    });




};