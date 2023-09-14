"use strict";

addEventListener('click', function (event) {
  var angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
  var velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5
  };
  frontEndProjectiles.push(new Projectile({
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    color: 'white',
    velocity: velocity
  }));
  console.log(frontEndProjectiles);
});