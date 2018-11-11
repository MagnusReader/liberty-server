var barcodemodalInstance;

function getUserBookings() {
    let user = localStorage.getItem("loggeduser");
    $.get("/search/user/bookings", {
        user: user
    }, function (data) {
        console.log(data);

        data.forEach(booking => {
            var bstring = "\
                <div class='row'>\
                    <div class='col s12'>\
                        <div class='card truncate'>\
                            <div class='card-content'>\
                                <span class='card-title'>"+booking.room.name+"</span>\
                                <p>Seat: "+JSON.stringify(booking.seat.position)+"</p>\
                                <p>Date: "+moment(booking.date).format("MMMM Do YYYY")+"</p>\
                                <p>Time: "+moment(booking.time.from).format("hh:mm a")+" - "+moment(booking.time.to).format("hh:mm a")+"</p>\
                            </div>\
                            <div class='card-action'>\
                                <a href='javascript:showbarcode("+JSON.stringify(booking._id)+")'>View barcode</a>\
                                <a href='javascript:cancelbooking("+JSON.stringify(booking._id)+")'>Cancel</a>\
                            </div>\
                        </div>\
                    </div>\
                </div>";

            if(booking.status){
                $("#closed").append(bstring);
            } else {
                $("#open").append(bstring);
            }
        });

    });
}


function showbarcode(booking){
    JsBarcode("#barcodeholder", booking, {
        width: 1
    });
    barcodemodalInstance.open();
}

function cancelbooking(booking){
    console.log(booking);

    $.get("/booking/delete",{
        booking:booking
    }, function(res){
        if(res){
            window.location.reload();
        }
    });
}


$(document).ready(function () {
    $(".tabs").tabs({
        swipeable: true
    });
    getUserBookings();
    barcodemodalInstance = M.Modal.init(document.getElementById("barcodemodal"));
});