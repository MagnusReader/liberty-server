var async = require("async");
var Moment = require("moment");
var MomentRange = require("moment-range");
var moment = MomentRange.extendMoment(Moment);

var User = require("../models/User");
var Room = require("../models/Room");
var Seat = require("../models/Seat");
var Booking = require("../models/Booking");
var BookingChart = require("../models/BookingChart");







exports.dashboardGet = function (req, res) {
    //res.send("5");
    // console.log("in dbget");

    async.parallel(
        [
            function (cb) {
                // console.log("in async");
                BookingChart.find({
                    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
                }).exec(
                    function (err, bookings) {


                        var filteredbooking = [];

                        if (bookings) {
                            // console.log("object found");

                            var bookingobject = bookings.map(booking => {
                                return booking.toObject();
                            });


                            var rangesearched = moment.range(new Date(moment()), new Date(parseInt(new Date(moment()).getTime() + 60 * 1000)));

                            filteredbooking = bookingobject.filter(booking => {
                                // console.log("filtering");
                                // console.log(booking);
                                // console.log(rangesearched);

                                var rangebooked = moment.range(new Date(booking.time.from), new Date(booking.time.to));
                                // console.log(rangebooked);

                                // console.log(rangesearched.overlaps(rangebooked));

                                return rangesearched.overlaps(rangebooked);
                            });

                            cb(err, filteredbooking.length);
                        } else {
                            cb(err, 0);

                        }
                    }
                );

            }
        ],
        function (err, data) {
            if (err) {
                throw err;
            }
            // console.log("sending");

            res.render("admin/index", {
                booked: data[0]
            });
        }
    );
};






exports.bookingsGet = function (req, res) {

    BookingChart.find({
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        status: false
    }).populate("user").exec(
        function (err, bookings) {

            if (err) {
                throw err;
            }
            if (bookings) {

                res.render("admin/bookings", {
                    bookings: bookings
                });
            }
        }
    );
};