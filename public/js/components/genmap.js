/* eslint-env browser */

function createChecks(box) {
    for (var y = 0; y < box.y; y++) {
        for (var x = 0; x < box.x; x++) {
            $("#genmap").append("<label><input type='checkbox' class='filled-in'  name='seats' value='{" + "'x':" + (x + 1) + "," + "'y':" + (y + 1) + "}'><span></span></label>");
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















function createMap(seats) {
    $("#seatmap").html("");

    for (var seat in seats) {
        var pc = seats[seat].pc ? "yellow" : "transparent";
        var status = seats[seat].status ? "" : "disabled";

        // $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].y - 1) * 32 + "px; left:" +
        //     (seats[seat].x - 1) * 32 + "px; transform: rotateZ(" + seats[seat].rot +
        //     "deg); border-style: " + pc + "; background: " + status + ";'></div>");

        $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].position.y - 1) * 32 + "px; left:" + (seats[seat].position.x - 1) * 32 + "px; border-color: " + pc + ";'><label for='" + seats[seat]._id + "'><input type='checkbox' class='filled-in seatbox' name='seats' id='" + seats[seat]._id + "' value='" + seats[seat]._id + "' " + status + "><span></span></label><div>");

    }
    $("#seatmapcontainer").slideDown();

}


function getSelectedSeats() {
    var seatForm = new FormData(document.getElementById("seatmap"));
    var selectedSeats = seatForm.getAll("seats");
    //console.log(selectedSeats);
    return selectedSeats;
}

function showLayout(room) {
    $.get("/search/seats", {
        room: room
    }, function (seats) {
        createMap(seats);
    });
}
