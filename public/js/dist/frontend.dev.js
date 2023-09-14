"use strict";

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var socket = io();
var scoreEl = document.querySelector('#scoreEl');
var devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;
var x = canvas.width / 2;
var y = canvas.height / 2; // const player = new Player(x, y, 10, 'white')

var frontEndPlayers = {};
var frontEndProjectiles = [];
socket.on("updatePlayers", function (backEndPlayers) {
  var _loop = function _loop(id) {
    var backEndPlayer = backEndPlayers[id];

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = new Player({
        x: backEndPlayer.x,
        y: backEndPlayer.y,
        radius: 10,
        color: backEndPlayer.color
      });
    } else {
      if (id === socket.id) {
        frontEndPlayers[id].x = backEndPlayer.x, frontEndPlayers[id].y = backEndPlayer.y;
        var lastBackendInput = playerInputs.findIndex(function (input) {
          return backEndPlayer.sequenceNumber === input.sequenceNumber;
        });

        if (lastBackendInput > -1) {
          playerInputs.slice(0, lastBackendInput + 1);
        }

        playerInputs.forEach(function (input) {
          frontEndPlayers[id].x += input.dx;
          frontEndPlayers[id].y += input.dy;
        });
      } else {
        frontEndPlayers[id].x = backEndPlayer.x, frontEndPlayers[id].y = backEndPlayer.y;
        gsap.to(frontEndPlayers[id], {
          x: backEndPlayer.x,
          y: backEndPlayer.y,
          duration: 0.015,
          ease: 'linear'
        });
      }
    }
  };

  for (var id in backEndPlayers) {
    _loop(id);
  }

  for (var _id in frontEndPlayers) {
    if (!backEndPlayers[_id]) {
      delete frontEndPlayers[_id];
    }
  }
});
var animationId;
var SPEED = 5;
var playerInputs = [];
var sequenceNumber = 0;

function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (var id in frontEndPlayers) {
    var frontEndPlayer = frontEndPlayers[id];
    frontEndPlayer.draw();
  }
}

animate();
var keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};
setInterval(function () {
  if (keys.w.pressed) {
    sequenceNumber++;
    playerInputs.push({
      sequenceNumber: sequenceNumber,
      dx: 0,
      dy: -SPEED
    });
    frontEndPlayers[socket.id].y -= SPEED;
    socket.emit('keydown', {
      keycode: 'KeyW',
      sequenceNumber: sequenceNumber
    });
  }

  if (keys.a.pressed) {
    sequenceNumber++;
    playerInputs.push({
      sequenceNumber: sequenceNumber,
      dx: -SPEED,
      dy: 0
    });
    frontEndPlayers[socket.id].x -= SPEED;
    socket.emit('keydown', {
      keycode: 'KeyA',
      sequenceNumber: sequenceNumber
    });
  }

  if (keys.s.pressed) {
    sequenceNumber++;
    playerInputs.push({
      sequenceNumber: sequenceNumber,
      dx: 0,
      dy: SPEED
    });
    frontEndPlayers[socket.id].y += SPEED;
    socket.emit('keydown', {
      keycode: 'KeyS',
      sequenceNumber: sequenceNumber
    });
  }

  if (keys.d.pressed) {
    sequenceNumber++;
    playerInputs.push({
      sequenceNumber: sequenceNumber,
      dx: SPEED,
      dy: 0
    });
    frontEndPlayers[socket.id].x += SPEED;
    socket.emit('keydown', {
      keycode: 'KeyD',
      sequenceNumber: sequenceNumber
    });
  }
}, 15);
window.addEventListener('keydown', function (event) {
  if (!frontEndPlayers[socket.id]) return;

  switch (event.code) {
    case 'KeyW':
      keys.w.pressed = true;
      break;

    case 'KeyA':
      // socket.emit('keydown', 'KeyA')
      keys.a.pressed = true;
      break;

    case 'KeyS':
      // socket.emit('keydown', 'KeyS')
      keys.s.pressed = true;
      break;

    case 'KeyD':
      // socket.emit('keydown', 'KeyD')
      keys.d.pressed = true;
      break;
  }
});
window.addEventListener('keyup', function (event) {
  if (!frontEndPlayers[socket.id]) return;

  switch (event.code) {
    case 'KeyW':
      keys.w.pressed = false;
      break;

    case 'KeyA':
      keys.a.pressed = false;
      break;

    case 'KeyS':
      keys.s.pressed = false;
      break;

    case 'KeyD':
      keys.d.pressed = false;
      break;
  }
});