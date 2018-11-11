function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login.html";
}