var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        //required: true,
        max: 100,
        default: 'User'
    },
    password: {
        type: String,
        max: 1000,
        default: '0123456789'
    },
    username: {
        type: String,
        //raequired: true,
        max: 20,
        default: "2018ACSC0123456"
    },
    // status: {
    //     type: Boolean,
    //     //required: true,
    //     default:true
    // },
    // image: {
    //     data: {
    //         type: Buffer,
    //     },
    //     contentType: {
    //         type: String,
    //         max: 15,
    //         default: 'png'
    //     }
    // }
    bookings: [{
        type: Schema.ObjectId,
        ref: 'Booking'
    }]
});


//Export model
module.exports = mongoose.model('User', UserSchema);