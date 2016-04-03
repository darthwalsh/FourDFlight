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
  color: "#00FFFF",
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

function clamp(num, min, max) {
  return num < min ? min : num > max ? max : num;
}

function update() {
  var speed = 20;
  if (keydown.left) {
    player.x -= speed;
  }
  if (keydown.right) {
    player.x += speed;
  }
  if (keydown.up) {
    player.y -= speed;
  }
  if (keydown.down) {
    player.y += speed;
  }
  
  player.x = clamp(player.x, 0, canvas.width - player.width);
  player.y = clamp(player.y, 0, canvas.height - player.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
}

function resize() {
  canvas.width  = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

var resizing = false;
var lastResize = 0;
function onResize() {
  clearTimeout(lastResize);
  lastResize = setTimeout(resize, 100);
  
  if (!resizing) {
    resize();
    resizing = true;
    setTimeout(function () {
      resizing = false;
    }, 100);
  }
}

var canvas : HTMLCanvasElement;
var ctx : CanvasRenderingContext2D;

window.onload = function() {
  canvas = <HTMLCanvasElement>$('canvas')[0];
  resize();
  window.addEventListener('resize', onResize, false);
  
  canvas.style.background = 'black';
  ctx = canvas.getContext('2d');
  
  var FPS = 30;
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);
};