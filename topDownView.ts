/// <reference path="world.ts" />
module TopDownView {
  export function Draw(
   canvas : HTMLCanvasElement,
   ctx: CanvasRenderingContext2D,
   game: World.Game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.fillStyle = "#0000FF";
  DrawCircle(ctx, game.goal.place);
  
  ctx.beginPath();
  ctx.fillStyle = "#00FFFF";
  DrawCircle(ctx, game.player.place);
 }

 function DrawCircle(ctx: CanvasRenderingContext2D, s: World.NSphere) {
  var x = s.loc.locs[0]
  var y = s.loc.locs.length >= 1 ? s.loc.locs[1] : this.canvas.height / 2;
  ctx.arc(x, y, s.size, 0, 2 * Math.PI);
  ctx.fill();
 }
}
