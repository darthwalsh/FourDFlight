/// <reference path="world.ts" />
/// <reference path="topDownView.ts" />

var game = new World.Game();

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

function resize() {
  canvas.width  = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

function draw() {
  TopDownView.Draw(canvas, ctx, game);
  ctx.fillStyle = "#00FFFF";
  ctx.fillText(game.points.toString(), 10, 30);
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
  ctx.font = '30px Verdana';
  
  var FPS = 60;
  setInterval(function() {
    game.update(keydown);
    draw();
  }, 1000/FPS);
};