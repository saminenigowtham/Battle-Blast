"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projectile =
/*#__PURE__*/
function () {
  function Projectile(_ref) {
    var x = _ref.x,
        y = _ref.y,
        radius = _ref.radius,
        color = _ref.color,
        velocity = _ref.velocity;

    _classCallCheck(this, Projectile);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  _createClass(Projectile, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    }
  }]);

  return Projectile;
}();