var mongoose = require("mongoose");
var moment = require('moment');
var Schema = mongoose.Schema;

var BookingChartSchema = new Schema({
    seat: {
        type: "String",
        max: 50
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

    logged: { in: {
            state: {
                type: Boolean,
                default: false,
                required: true
            },
            time: {
                type: Number

            }
        },
        out: {
            state: {
                type: Boolean,
                default: false,
                required: true
            },
            time: {
                type: Number

            }
        }
    },

    user: {
        type: Schema.ObjectId,
        ref: "User"
    },

});

BookingChartSchema.virtual('dateFormatted').get(function () {
    return moment(this.due_back).format('MMMM Do, YYYY');
});

BookingChartSchema.virtual('fromForm').get(function () {
    return moment(this.time.from).format('HH:mm');
});

BookingChartSchema.virtual('toForm').get(function () {
    return moment(this.time.to).format('HH:mm');
});



//Export model
module.exports = mongoose.model("BookingChart", BookingChartSchema);