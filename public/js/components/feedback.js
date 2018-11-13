function getAllFeedback() {
    
    $.get("/feedback/all", function (data) {
        if (data) {
            data.forEach(feedback => {
                var radio_resolved_checked = "";
                var radio_unresolved_checked = "";
                if (feedback.status) {
                    radio_resolved_checked = "checked";
                } else {
                    radio_unresolved_checked = "checked";
                }

                var bstring = "\
                <div class='col s6'>\
                            <ul class='collapsible curved'>\
                                <li>\
                                    <div class='collapsible-header  '><i class='material-icons'>filter_drama</i>"+feedback.user.name+"</div>\
                                    <div class='collapsible-body '><span>"+feedback.description+"</span>\
                                        <!-- radio buttons -->\
                                        <form action='#'>\
                                            <p>\
                                                <label>\
                                                    <input name='group1' "+radio_resolved_checked+" type='radio' class='with-gap />\
                                                    <span>Resolved</span>\
                                                </label>\
                                                <label>\
                                                    <input name='group1' "+radio_unresolved_checked+" type='radio' class='with-gap' />\
                                                    <span>Not Resolved</span>\
                                                </label>\
                                        </form>\
                                    </div>\
                                </li>\
                            </ul>\
                        </div>";

                $("#feedback").append(bstring);
                
            });
        } 
    });
}