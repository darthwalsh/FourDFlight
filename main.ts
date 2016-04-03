function create(tag, attr) { 
  var el = document.createElement(tag);
  if (attr) {
    for (var key in attr) {
      el[key] = attr[key];
    }
  }
  return el; 
}

var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var keydown: any = {};
function keyName(event) {
  return (<any>jQuery).hotkeys.specialKeys[event.which] ||
    String.fromCharCode(event.which).toLowerCase();
}

$(document).bind("keydown", function(event) {
  keydown[keyName(event)] = true;
});

$(document).bind("keyup", function(event) {
  keydown[keyName(event)] = false;
});

function update() {
  if (keydown.left) {
    player.x -= 2;
  }

  if (keydown.right) {
    player.x += 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
}

var canvas : HTMLCanvasElement;
var ctx : CanvasRenderingContext2D;

window.onload = function() {
  canvas = <HTMLCanvasElement><any>$('canvas')[0];
  ctx = canvas.getContext('2d');
  
  var FPS = 30;
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);
};