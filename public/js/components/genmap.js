/* eslint-env browser */

function createChecks(box) {
    for (var y = 0; y < box.y; y++) {
        for (var x = 0; x < box.x; x++) {
            $("#genmap").append("<label><input type='checkbox' class='filled-in'  name='seats' value='{" + '"x":' + (x + 1) + "," + '"y":' + (y + 1) + "}'><span></span></label>");
        }
        $("#genmap").append("<br />");
    }
    //$("#genmap").append("<button class='btn blue' type='submit'>submit</button>");
}


$(document).ready(function () {
    createChecks({
        x: 10,
        y: 10
    });
});

function printMap() {
    var seatForm = new FormData(document.getElementById("genmap"));
    seatForm = seatForm.getAll("seats");

    var newdata = [];
    for (var i in seatForm) {
        newdata.push(JSON.parse(seatForm[i]));
    }
    console.log(newdata);
}

function generateMap() {
    var seatForm = new FormData(document.getElementById("genmap"));
    seatForm = seatForm.getAll("seats");

    var newdata = [];
    for (var i in seatForm) {
        newdata.push(JSON.parse(seatForm[i]));
    }
    var layout = {
        seats: newdata,
        room: $("#room").val()
    };

    $.get("/create/seats", layout, function (data) {
        console.log(data);
    });
}