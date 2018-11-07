var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SeatSchema = new Schema({
    position: {
        x: {
            type: Number,
            max: 1000,
            default: 0
        },
        y: {
            type: Number,
            max: 1000,
            default: 0
        },
        rot: {
            type: Number,
            min: 0,
            max: 360,
            default: 0
        }

    },
    
    pc: {
        type: Boolean,
        default: false
    }
});


//Export model
module.exports = mongoose.model('Seat', SeatSchema);