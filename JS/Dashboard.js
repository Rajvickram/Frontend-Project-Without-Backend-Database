$(document).ready(function () {
    var user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "Login.html";
    }

    $('#logout').click(function () {
        localStorage.removeItem('user');

        window.location.href = "Login.html";
    });
});