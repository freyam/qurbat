// Make connection
var socket = io.connect("http://localhost:4000");

// Query DOM
var message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", function () {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value,
    });
    message.value = "";
});

message.addEventListener("keypress", function (key) {
    console.log(key);

    if (key.key === "Enter") {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value,
        });
        message.value = "";
    }

    socket.emit("typing", {
        message: message.value,
        handle: handle.value,
    });
});

// Listen for events
socket.on("chat", function (data) {
    const { handle, message } = data;

    feedback.innerHTML = "";
    output.innerHTML +=
        "<p><strong>" + handle + ": </strong>" + message + "</p>";
});

socket.on("typing", function (data) {
    const { handle, message } = data;

    feedback.innerHTML = "<p><em>" + handle + ": " + message + "</em></p>";
});
