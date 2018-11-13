var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackTypeSchema = new Schema({
    
    name: {
        type: String
    }
});

//Export model
module.exports = mongoose.model('FeedbackType', FeedbackTypeSchema);