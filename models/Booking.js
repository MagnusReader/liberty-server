var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    seat: {
        type: Schema.ObjectId,
        ref: "Seat"
    },

    date: {
        type: Date
    },

    time: {
        from: {
            type: Number

        },
        to: {
            type: Number
        }

    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },

    user: {
        type: Schema.ObjectId,
        ref: "User"
    },

    room: {
        type: Schema.ObjectId,
        ref: "Room"
    }
});


//Export model
module.exports = mongoose.model("Booking", BookingSchema);