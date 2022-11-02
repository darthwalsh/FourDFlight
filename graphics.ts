import {Game, Shape} from "./world.js";

export default class Graphics {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  l: number;
  t: number;
  w: number;
  h: number;
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    l: number,
    t: number,
    h: number,
    w: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.l = l;
    this.t = t;
    this.w = w;
    this.h = h;
  }

  draw(x: number, y: number, r: number, color=null) {
    const canvasX = x * this.w + this.l;
    const canvasY = y * this.h + this.t;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(canvasX, canvasY, r * region.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export function TopDownDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bound = 50;

  let all = [game.player].concat(game.goals);
  let dx = [minX(all) - bound, maxX(all) + bound];
  let dy = game.player.loc.length > 1 ? [minY(all) - bound, maxY(all) + bound] : [-bound, bound];

  ctx.fillStyle = "#0000FF";
  game.goals.forEach(goal => {
    ctx.beginPath();
    DrawCircle(canvas, ctx, goal, dx, dy);
  });

  ctx.beginPath();
  ctx.fillStyle = "#00FFFF";
  DrawCircle(canvas, ctx, game.player, dx, dy);
}

function DrawCircle(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  s: Shape,
  dx: number[],
  dy: number[]
) {
  let x = ((s.loc[0] - dx[0]) / (dx[1] - dx[0])) * canvas.width;
  let y = (s.loc.length > 1 ? (s.loc[1] - dy[0]) / (dy[1] - dy[0]) : 0.5) * canvas.height;
  ctx.arc(x, y, s.size, 0, 2 * Math.PI);
  ctx.fill();
}

function minX(arr: Shape[]) {
  return Math.min(...arr.map(s => s.loc[0]));
}

function maxX(arr: Shape[]) {
  return Math.max(...arr.map(s => s.loc[0]));
}

function minY(arr: Shape[]) {
  return Math.min(...arr.map(s => s.loc[1]));
}

function maxY(arr: Shape[]) {
  return Math.max(...arr.map(s => s.loc[1]));
}
