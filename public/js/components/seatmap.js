var timetoInstance, timefromInstance, dateInstance;


function createMap(seats) {
    for (var seat in seats) {
        var pc = seats[seat].pc ? "yellow" : "transparent";
        //var status = seats[seat].available ? "" : "disabled";

        // $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].y - 1) * 32 + "px; left:" +
        //     (seats[seat].x - 1) * 32 + "px; transform: rotateZ(" + seats[seat].rot +
        //     "deg); border-style: " + pc + "; background: " + status + ";'></div>");

        $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].position.y - 1) * 32 + "px; left:" + (seats[seat].position.x - 1) * 32 + "px; transform: rotateZ(" + seats[seat].position.rot + "deg); border-color: " + pc + ";'><label><input type='checkbox' class='filled-in'  name='seats' value='" + seat + "' " + status + "><span></span></label><div>");

    }
    $("#seatmapcontainer").slideDown();

}

$(document).ready(function () {

    localStorage.setItem("room", "motala");

    $("#seatmapcontainer").slideUp();

    // createMap(seatdescription);

    timetoInstance = M.Timepicker.init(document.getElementById('timeto'), {
        fromNow: 60 * 60 * 1000 // 1 hour from now
    });

    timefromInstance = M.Timepicker.init(document.getElementById('timefrom'));

    dateInstance = M.Datepicker.init(document.getElementById('date'), {
        maxDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // This allows booking only for 2 days in advance
        minDate: new Date()
    });

    showLayout("motala");

    dateInstance.setDate(new Date());

    M.updateTextFields();

});



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

function getNeeds() {
    // var needs = {
    //     room: localStorage.getItem("room"),
    //     from: timefromInstance.time,
    //     to: timetoInstance.time,
    //     date: $("#date").val()
    //     // persons: $("#people").val()
    // };

    var needs = {
        room: localStorage.getItem("room"),
        from: (new Date(moment($("#date").val() + " " + timefromInstance.time).format())).getTime(),
        to: (new Date(moment($("#date").val() + " " + timetoInstance.time).format())).getTime()
        // persons: $("#people").val()
    };
    
    console.log(needs);
    // console.log(new Date());
    return needs;
}

function searchSeats() {
    $.get("/search/seats", getNeeds(), function (data) {
        console.log(data);
    });
}

function bookSeats() {
    var booking = {
        seats: getSelectedSeats(),
        from: $("#timefrom").val(),
        to: $("#timeto").val(),
        date: $("#date").val(),
        persons: $("#people").val()
    };

    //console.log(booking);

    $.get("/book/seats", booking, function (data) {
        console.log(data);
    });

}