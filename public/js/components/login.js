function submitform() {
    var login = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    $.post("/user/login", login, function (data) {
        if (data) {
            localStorage.setItem("loggeduser", login.username);
            window.location.href = "/";
        } else {
            alert(data);
        }
    });
}