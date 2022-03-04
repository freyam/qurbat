var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(4000, function () {
    process.stdout.write("\033c");
    console.log("Qurbat deployed on https://localhost:4000");
});

app.use(express.static("public"));

var io = socket(server);
io.on("connection", (socket) => {
    console.log("User " + socket.id + " connected");

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });

    socket.on("chat", function (data) {
        io.sockets.emit("chat", data);
    });
});
