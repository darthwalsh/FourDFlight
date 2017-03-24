/// <reference path="world.ts" />
module TopDownView {
  export function Draw(
   canvas : HTMLCanvasElement,
   ctx: CanvasRenderingContext2D,
   game: World.Game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const bound = 50;

  var all = [ game.player ].concat(game.goals);
  var dx = [ minX(all) - bound, maxX(all) + bound];
  var dy = game.player.loc.length > 1 ? [ minY(all) - bound, maxY(all) + bound ] : [ -bound, bound ];
  
  ctx.fillStyle = "#0000FF";
  game.goals.forEach(goal => {
    ctx.beginPath();
    DrawCircle(ctx, goal, dx, dy);
  });
  
  ctx.beginPath();
  ctx.fillStyle = "#00FFFF";
  DrawCircle(ctx, game.player, dx, dy);
 }

 function DrawCircle(ctx: CanvasRenderingContext2D, s: World.Shape, dx: number[], dy: number[]) {
  var x = (s.loc[0] - dx[0]) / (dx[1] - dx[0]) * this.canvas.width;
  var y = (s.loc.length > 1 ? ((s.loc[1]- dy[0]) / (dy[1] - dy[0])) : 0.5) * this.canvas.height;
  ctx.arc(x, y, s.size, 0, 2 * Math.PI);
  ctx.fill();
 }

 function minX(arr: World.Shape[]) {
   return Math.min(...arr.map(s => s.loc[0]));
 } 
 
 function maxX(arr: World.Shape[]) {
   return Math.max(...arr.map(s => s.loc[0]));
 }

 function minY(arr: World.Shape[]) {
   return Math.min(...arr.map(s => s.loc[1]));
 }

 function maxY(arr: World.Shape[]) {
   return Math.max(...arr.map(s => s.loc[1]));
 }
}
