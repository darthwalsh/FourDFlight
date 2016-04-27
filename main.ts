/// <reference path="world.ts" />
/// <reference path="topDownView.ts" />

function assertThrow(message: string) {
  debugger;
  alert(message);
  throw message;
}

var game: World.Game;
var drawer: (canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: World.Game) => void;

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

function resize() {
  canvas.width  = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

function draw() {
  if (game) {
    drawer(canvas, ctx, game);
    ctx.fillStyle = "#00FFFF";
    ctx.fillText(game.points.toString(), 10, 30);
  }  
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

var level = "";
var levels = {
  "1d": TopDownView.Draw,
  "2d": TopDownView.Draw 
};

function onHashChange(ev: HashChangeEvent) {
  var hash = window.location.hash.substring(1);
  
  if (hash === "") {
    level = "";
    game = null;
    levelChoiceDiv.style.display = "";
    return;
  }
  
  if (!(hash in levels)) {
    alert("Unknown level!");
    return;
  }
  
  level = hash;
  game = new World.Game(+hash[0]);
  drawer = levels[hash];
  levelChoiceDiv.style.display = 'none';
}

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var levelChoiceDiv: HTMLDivElement;

window.onload = function() {
  canvas = <HTMLCanvasElement>$('canvas')[0];
  resize();
  window.addEventListener('resize', onResize, false);
  
  canvas.style.background = 'black';
  ctx = canvas.getContext('2d');
  ctx.font = '30px Verdana';
  
  levelChoiceDiv = document.createElement("div");
  for (var key in levels) {
    let button = document.createElement("button");
    button.innerText = key;
    button.onclick = function(ev) { window.location.hash = this.innerText; };
    levelChoiceDiv.appendChild(button); 
  }
  levelChoiceDiv.style.position = "fixed";
  levelChoiceDiv.style.top = "100px";
  canvas.parentElement.appendChild(levelChoiceDiv);
  
  window.onhashchange = onHashChange;
    
  var FPS = 60;
  setInterval(function() {
    if (game) game.update(keydown);
    draw();
  }, 1000/FPS);
};