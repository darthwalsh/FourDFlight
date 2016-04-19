/// <reference path="world.ts" />
module TopDownView {
  export function Draw(
   canvas : HTMLCanvasElement,
   ctx: CanvasRenderingContext2D,
   game: World.Game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.fillStyle = game.goal.color;
  DrawCircle(ctx, game.goal.place);
  
  ctx.beginPath();
  ctx.fillStyle = game.player.color;
  DrawCircle(ctx, game.player.place);
 }

 function DrawCircle(ctx: CanvasRenderingContext2D, s: World.NSphere) {
  ctx.arc(s.loc.locs[0], s.loc.locs[1], s.size, 0, 2 * Math.PI);
  ctx.fill();
 }
}
