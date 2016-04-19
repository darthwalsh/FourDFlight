/// <reference path="world.ts" />
/// <reference path="topDownView.ts" />

var player = new World.Player();
player.place = new World.NSphere(new World.Point(100, 100), 20);

var goal = new World.Goal();
goal.place = new World.NSphere(new World.Point(300, 300), 30);

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
    player.place.loc.locs[0] -= speed;
  }
  if (keydown.right) {
    player.place.loc.locs[0] += speed;
  }
  if (keydown.up) {
    player.place.loc.locs[1] -= speed;
  }
  if (keydown.down) {
    player.place.loc.locs[1] += speed;
  }
  
  player.place.loc.locs[0] = clamp(
    player.place.loc.locs[0], 0, canvas.width - player.place.size * 2);
  player.place.loc.locs[1] = clamp(
    player.place.loc.locs[1], 0, canvas.height - player.place.size * 2);
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

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

window.onload = function() {
  canvas = <HTMLCanvasElement>$('canvas')[0];
  resize();
  window.addEventListener('resize', onResize, false);
  
  canvas.style.background = 'black';
  ctx = canvas.getContext('2d');
  
  var FPS = 30;
  setInterval(function() {
    update();
    TopDownView.Draw(canvas, ctx, player, goal);
  }, 1000/FPS);
};