

















var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {
        type: String,
        //required: true,
        max: 100,
        default: 'Room'
    },

    bookings: [{
        type: Schema.ObjectId,
        ref: 'Booking'
    }],


    seats: [{
        type: Schema.ObjectId,
        ref: 'Seat'
    }]
});


//Export model
module.exports = mongoose.model('Room', RoomSchema);