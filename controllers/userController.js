var User = require("../models/User");

// Handle User create on POST.
exports.user_create_post = function (req, res) {

    var newuser = new User({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username
    });



};