var feedback = require("../models/Feedback");
var feedbackType = require("../models/FeedbackType");

// Handle feedback create on POST.
exports.feedback_create_post = function (req, res) {

    var newfeedback = new feedback({
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

exports.feedbacktype_get_all = function (req, res) {

    feedbackType.find({}).exec(function (err, data) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data && data.length > 0) {
            console.log("data present" + data);
            res.send(data);
        } else {
            console.log("no data present");
            var myobj = [{
                    name: 'Review'
                },
                {
                    name: 'Complaint'
                },
                {
                    name: 'Suggestion'
                }
            ];
            feedbackType.insertMany(myobj, function (err, res) {
                if (err) throw err;
                console.log("result" + res);
            });

        }
    });
};

exports.feedback_update_status = function (req, res) {

    var myquery = {
        '_id': req.id
    };
    var newvalues = {
        $set: {
            '_id': req.flag
        }
    };
    feedback.updateOne(myquery, newvalues, function (err, res) {
        if (err) {
            res.send(false);
            throw err;
        }
        if (data) {
            res.send(data);
        }
    });
};