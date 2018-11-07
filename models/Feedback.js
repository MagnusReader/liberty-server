var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: false
    },

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    description: {
        type: String,
        max: 1000
    }
});


//Export model
module.exports = mongoose.model('Feedback', FeedbackSchema);