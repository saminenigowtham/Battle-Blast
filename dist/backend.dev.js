"use strict";

var _require = require('console'),
    log = _require.log;

var express = require('express');

var app = express();

var http = require('http');

var _require2 = require('os'),
    arch = _require2.arch;

var server = http.createServer(app);

var _require3 = require("socket.io"),
    Server = _require3.Server;

var io = new Server(server, {
  pingInterval: 2000,
  pingTimeout: 5000
});
var port = 3000;
app.use(express["static"]('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
var backEndPlayers = {};
var SPEED = 5;
io.on('connection', function (socket) {
  console.log('a user connected');
  backEndPlayers[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
    color: "hsl(".concat(360 * Math.random(), ",100%,50%)"),
    sequenceNumber: 0
  };
  io.emit('updatePlayers', backEndPlayers);
  socket.on('disconnect', function (reason) {
    console.log(reason);
    delete backEndPlayers[socket.id];
    io.emit('updatePlayers', backEndPlayers);
  });
  socket.on('keydown', function (_ref) {
    var keycode = _ref.keycode,
        sequenceNumber = _ref.sequenceNumber;
    var backEndPlayer = backEndPlayers[socket.id];
    backEndPlayers[socket.id].sequenceNumber = sequenceNumber;

    switch (keycode) {
      case 'KeyW':
        backEndPlayers[socket.id].y -= SPEED;
        break;

      case 'KeyA':
        backEndPlayers[socket.id].x -= SPEED;
        break;

      case 'KeyS':
        backEndPlayers[socket.id].y += SPEED;
        break;

      case 'KeyD':
        backEndPlayers[socket.id].x += SPEED;
        break;
    }
  }); // console.log(backEndPlayers);
});
setInterval(function () {
  io.emit('updatePlayers', backEndPlayers);
}, 15);
server.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});