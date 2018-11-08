var timetoInstance, timefromInstance, dateInstance, userchipInstance;


function createMap(seats) {
    $("#seatmap").html("");

    for (var seat in seats) {
        var pc = seats[seat].pc ? "yellow" : "transparent";
        var status = seats[seat].status ? "" : "disabled";

        // $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].y - 1) * 32 + "px; left:" +
        //     (seats[seat].x - 1) * 32 + "px; transform: rotateZ(" + seats[seat].rot +
        //     "deg); border-style: " + pc + "; background: " + status + ";'></div>");

        $("#seatmap").append("<div class='seat' style='top:" + (seats[seat].position.y - 1) * 32 + "px; left:" + (seats[seat].position.x - 1) * 32 + "px; transform: rotateZ(" + seats[seat].position.rot + "deg); border-color: " + pc + ";'><label for='" + seats[seat]._id + "'><input type='checkbox' class='filled-in seatbox' name='seats' id='" + seats[seat]._id + "' value='" + seats[seat]._id + "' " + status + "><span></span></label><div>");

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

function updateChipCount() {
    userchipInstance.options.limit = getSelectedSeats().length;

    console.log(userchipInstance.options.limit);

}

function getNeeds() {
    var needs = {
        room: localStorage.getItem("room"),
        from: (new Date(moment($("#date").val() + " " + timefromInstance.time).format())).getTime(),
        to: (new Date(moment($("#date").val() + " " + timetoInstance.time).format())).getTime(),
        date: $("#date").val()
        // persons: $("#people").val()
    };

    // console.log(needs);
    // console.log(new Date());
    return needs;
}

function searchSeats() {
    $.get("/search/seats", getNeeds(), function (seats) {
        // console.log(data);
        createMap(seats);
        $("#bookbtn").removeClass("disabled");
    });
}

function bookSeats() {
    var booking = getNeeds();
    booking["seats"] = getSelectedSeats();
    booking["users"] = userchipInstance.chipsData;

    //localStorage.setItem("booking", JSON.stringify(booking));
    if (booking.seats.length == booking.users.length) {
        console.log(booking);

        $.post("/book/seats", {bookingdata:JSON.stringify(booking)}, function (data) {
            console.log(data);
        });
    } else {
        alert("Number of seats and number of persons should be same.");
    }

}

function searchPerson(glob) {

    if (glob.length >= 3) {
        $.get("/search/user", {
            user: glob
        }, function (userlist) {
            return userlist;
            // console.log(userlist);
        });
    }

}

$(".custom-class").keyup(function () {
    //console.log($(this).val());

    var glob = $(this).val();

    if (glob.length >= 3) {
        $.get("/search/user", {
            user: glob
        }, function (userlist) {

            if (userlist) {


                for (var user in userlist) {
                    // console.log(user);
                    var name = userlist[user].name;
                    userchipInstance.autocomplete.options.data[name] = null;
                }

                console.log(userchipInstance);
                // console.log(newlist);
            }
        });
    }
});

$(".custom-class").focus(function () {
    updateChipCount();
});




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


    userchipInstance = M.Chips.init(document.getElementById("users"), {
        autocompleteOptions: {
            data: {
                "Apple": null,
                "Microsoft": null,
                "Google": null
            },
            limit: Infinity,
            minLength: 1
        },
        limit: 5,
        placeholder: "Enter a name",
        secondaryPlaceholder: "+Name"
    });


    M.updateTextFields();


});