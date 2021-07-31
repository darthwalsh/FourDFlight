import TopDownDraw from "./topDownView.js";
import {Game} from "./world.js";

type DrawFunction = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) => void;
let drawer: DrawFunction;
let game: Game | null;

let keydown: any = {};
function keyName(event: JQueryEventObject) {
  return (
    (<any>jQuery).hotkeys.specialKeys[event.which] || String.fromCharCode(event.which).toLowerCase()
  );
}

$(document).bind("keydown", event => (keydown[keyName(event)] = true));
$(document).bind("keyup", event => (keydown[keyName(event)] = false));

function resize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

function draw() {
  if (game) {
    drawer(canvas, ctx, game);
    ctx.fillStyle = "#00FFFF";
    ctx.fillText(game.level.toString(), 10, 60);
  }
}

let resizing = false;
let lastResize = 0;
function onResize() {
  clearTimeout(lastResize);
  lastResize = setTimeout(resize, 100);

  if (!resizing) {
    resize();
    resizing = true;
    setTimeout(() => (resizing = false), 100);
  }
}

let level = "";
let levels: {[key: string]: DrawFunction} = {
  "1d": TopDownDraw,
  "2d": TopDownDraw,
};

function onHashChange() {
  let hash = window.location.hash.substring(1);

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
  game = new Game(+hash[0]);
  drawer = levels[hash];
  levelChoiceDiv.style.display = "none";
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let levelChoiceDiv: HTMLDivElement;

function levelButtonOnclick(ev: MouseEvent) {
  const button = ev.target as HTMLButtonElement;
  window.location.hash = button.innerText;
}

window.onload = () => {
  canvas = <HTMLCanvasElement>$("canvas")[0];
  resize();
  window.addEventListener("resize", onResize, false);

  canvas.style.background = "black";
  ctx = canvas.getContext("2d")!;
  ctx.font = "60px Verdana";

  levelChoiceDiv = document.createElement("div");
  for (let key in levels) {
    let button = document.createElement("button");
    button.innerText = key;
    button.onclick = levelButtonOnclick;
    levelChoiceDiv.appendChild(button);
  }
  levelChoiceDiv.style.position = "fixed";
  levelChoiceDiv.style.top = "100px";
  canvas.parentElement?.appendChild(levelChoiceDiv);

  window.onhashchange = onHashChange;
  onHashChange();

  let FPS = 60;
  setInterval(() => {
    if (game) game.update(keydown);
    draw();
  }, 1000 / FPS);
};
