var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({

    date: {
        type: Date,
        default: new Date()
    },
    type: {
        type: Schema.ObjectId,
        ref: "FeedbackType"
    },
    status: {
        type: Boolean,
        default: false
    },

    user: {
        type: String
    },

    description: {
        type: String,
        max: 1000
    }
});


//Export model
module.exports = mongoose.model('Feedback', FeedbackSchema);