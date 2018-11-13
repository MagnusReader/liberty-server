var feedback = require("../models/Feedback");

// Handle feedback create on POST.
exports.feedback_create_post = function (req, res) {

    var newfeedback = new Feedback({
        date: req.body.date,
        status: req.body.status,
        user: req.body.user,
        description: req.body.description
    });

    newfeedback.save(function (err) {
        if (err) {
            res.send(false);
            throw err;
        } else {
            res.send(true);
        }
    });


};

exports.feedback_get_all = function (req, res) {

    feedback.find({}).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};

exports.feedback_update_status = function (req, res) {

    var myquery = { '_id': req.id };
    var newvalues = { $set: { '_id': req.flag } };
    feedback.updateOne(myquery, newvalues, function(err, res){
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};
