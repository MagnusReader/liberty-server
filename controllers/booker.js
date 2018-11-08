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


exports.searchSeats = function (req, res) {

    Room.findOne({
        name: req.query.room
    }).populate("seats").exec(function (err, data) {
        
        data = data.toObject();
        
        if (err) {
            res.send(err);
            throw err;
        }

        var seats = data.seats;

        for (var seat in data.seats) {
            // seats[seat] = data.seats[seat].toObject();

            seats[seat].status = true;

            Booking.find({
                seat: seats[seat]._id,

                $or: [{
                    time: {
                        from: {
                            $gt: req.query.from
                        }
                    }
                }, {
                    time: {

                        to: {
                            $lt: req.query.to
                        }
                    }
                }]

            }).exec(function (err, data) {
                if (err) {
                    res.send(err);
                    throw err;
                }

                if (data[0]) {
                    seats[seat].status = false;
                }
            });
        }

        res.send(seats);
    });
};


exports.createBooking = function (req, res) {
    var newbooking = new Booking({
        seat: req.body.seat,
    
        time: {
            from: req.body.from,
            to: req.body.to
    
        },
        
        user: req.body.user,
        room: req.body.room
    });

    newbooking.save();
};