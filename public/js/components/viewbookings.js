

function showbarcode(booking){
    JsBarcode("#barcodeholder", booking, {
        width: 1
    });
    barcodemodalInstance.open();
}


function cancelbookingnew(booking) {
    console.log(booking);

    $.get("/booking/delete/new", {
        booking: booking
    }, function (res) {
        if (res) {
            window.location.reload();
        }
    });
}
