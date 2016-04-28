/// <reference path="world.ts" />
module TopDownView {
  export function Draw(
   canvas : HTMLCanvasElement,
   ctx: CanvasRenderingContext2D,
   game: World.Game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.fillStyle = "#0000FF";
  DrawCircle(ctx, game.goal);
  
  ctx.beginPath();
  ctx.fillStyle = "#00FFFF";
  DrawCircle(ctx, game.player);
 }

 function DrawCircle(ctx: CanvasRenderingContext2D, s: World.Shape) {
  var x = s.loc[0]
  var y = s.loc.length >= 1 ? s.loc[1] : this.canvas.height / 2;
  ctx.arc(x, y, s.size, 0, 2 * Math.PI);
  ctx.fill();
 }
}
