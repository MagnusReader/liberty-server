var User = require('../models/User');
var Room = require('../models/Room');
var Seat = require('../models/Seat');
var Booking = require('../models/Booking');


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
            console.error(err);
            res.send(false);
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
            console.error(err);
            res.send(false);
        } else {
            res.send(true);
        }
    });


};


exports.searchSeats = function (req, res) {

    Room.findOne({
        name: req.query.room
    }).populate('seats').exec(function (err, data) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        // console.log(data.seats);



        var seats = data.seats;

        for (var seat in seats) {
            Booking.find({
                seat: seats[seat]._id,

                time: {
                    from: {
                        $gt: req.query.from
                    },
                    to: {
                        $lt: req.query.to
                    }
                }
            }).exec(function (err, data) {
                if (err) {
                    console.error(err);
                }
                if (data[0]) {
                    seats[seat].status = false;
                }
            });
        }







        res.send(seats);


    });




};


exports.createBooking = function () {

};