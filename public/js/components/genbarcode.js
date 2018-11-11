$(document).ready(function(){
    var bookings = JSON.parse(localStorage.getItem("bookings"));
    for (var booking in bookings){
        $("#barcodecontainer").append("<div class='col s12'><div class='card center'><h5 class='center'>"+bookings[booking].user+"</h5><svg id='bar"+bookings[booking].seat+"'></svg></div></div>");
        
        JsBarcode("#bar"+bookings[booking].seat, bookings[booking].seat, {
            width: 1
        });
    }
});