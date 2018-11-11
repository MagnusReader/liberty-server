var async = require("async");
var Moment = require("moment");
var MomentRange = require("moment-range");
var moment = MomentRange.extendMoment(Moment);

var User = require("../models/User");
var Room = require("../models/Room");
var Seat = require("../models/Seat");
var Booking = require("../models/Booking");

exports.createSeatsGet = function (req, res) {

    var newroom = new Room({
        name: req.query.room
    });

    var seats = req.query.seats;

    for (var seat in seats) {
        var newseat = new Seat({
            position: {
                x: seats[seat].x,
                y: seats[seat].y,
                rot: 0
            },
            pc: true

        });

        newseat.save();
        newroom.seats.push(newseat._id);
    }

    newroom.save(function (err) {
        if (err) {
            res.send(false);
            throw err;
        } else {
            res.send(true);
        }
    });



};


exports.createRoomGet = function (req, res) {
    var newroom = new Room({
        name: req.query.room
    });

    newroom.save(function (err) {
        if (err) {
            res.send(false);
            throw err;
        } else {
            res.send(true);
        }
    });


};

exports.deleteAllBookingsGet = function (req, res) {
    Booking.remove({}, function (err) {
        if (err) {
            throw err;
        }
        // Success - go to author list
        res.send(true);
    });
};

exports.searchSeats = function (req, res) {

    async.parallel([
        function (cb) {
            Room.findOne({
                name: req.query.room
            }).populate("seats").exec(function (err, data) {
                if (data) {
                    data = data.toObject();

                }
                // data = data.toObject();
                cb(err, data.seats);
            });
        },

        function (cb) {
            Booking.find({
                status: false,
                // room: req.query.room,
            }).populate("room").exec(function (err, bookdata) {

                // console.log(bookdata);
                var bookings;

                if (bookdata) {
                    bookings = bookdata.map(booking => {
                        return booking.toObject();
                    });
                }

                cb(err, bookings);
            });
        }

    ], function (err, results) {
        if (err) {
            throw err;
        }

        var seats = results[0];
        var bookings = results[1];

        //console.log("[seats: " + seats + " - bookings: " + bookings + "]\n\n");

        for (var seat in seats) {
            seats[seat].status = true;
            //console.log("inseat " + seats[seat]._id);

            for (var booking in bookings) {
                //console.log("inbooking " + bookings[booking]["seat"]);

                if (JSON.stringify(bookings[booking]["seat"]) == JSON.stringify(seats[seat]._id)) {
                    //console.log("inif " + +" ");

                    var rangebooked = moment.range(new Date(bookings[booking].time.from), new Date(bookings[booking].time.to));
                    var rangesearched = moment.range(new Date(parseInt(req.query.from)), new Date(parseInt(req.query.to)));

                    //console.log("[booked: " + rangebooked + " - searched: " + rangesearched + "]\n\n");

                    if (rangesearched.overlaps(rangebooked)) {
                        //console.log(true);
                        seats[seat].status = false;
                    }
                }
            }
        }

        //console.log(bookings);

        res.send(seats);
    });

};



exports.delete_booking_get = function (req, res) {
    Booking.findById(req.query.booking).exec(function (err, booking) {
        if (err) {
            throw err;
        }

        booking.status = true;

        Booking.findByIdAndUpdate(req.query.booking, booking, {}, function (err) {
            if (err) {
                throw err;
            }
            res.send(true);
        });
    });
};






















exports.createBookingPost = function (req, res) {

    var tobook = JSON.parse(req.body.bookingdata);

    //console.log(tobook);
    Room.findOne({
        name: tobook.room
    }).exec(function (err, room) {

        if (err) {
            throw err;
        }
        var doneq = [];
        async.each(tobook.seats, function (seat, cb) {
            var index = tobook.seats.indexOf(seat);
            User.findOne({
                name: tobook.users[index].tag
            }).exec(function (err, user) {
                if (err) {
                    throw err;
                }
                var newbooking = new Booking({
                    seat: seat,
                    date: new Date(tobook.date),
                    time: {
                        from: tobook.from,
                        to: tobook.to

                    },
                    user: user._id,
                    room: room._id
                });

                newbooking.save(function (err, data) {
                    if (err) {
                        res.send(false);
                        throw err;
                    } else {
                        doneq.push(newbooking);
                        //console.log(data);
                        cb(null, true);
                    }
                });

            });



        }, function (err, data) {
            console.log(doneq);
            // console.log(data);
            if (err) {
                throw err;
            }
            // res.JSON(JSON.parse(data));
            res.send(doneq);
        });
    });

};