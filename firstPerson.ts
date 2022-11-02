import {Game, Shape} from "./world.js";

export default function FirstPersonDraw(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  game: Game
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0000FF";
  game.goals.forEach((s: Shape) => {
    if (s.loc[1] >= 0) return; // TODO needed?

    const d = Math.hypot(...s.loc);
    // MAYBE correct for const d_screen = d * Math.abs(Math.cos(angle));
    const radius = 4000 / d;

    const xRads = Math.atan2(-s.loc[0], -s.loc[1]); // TODO range
    const xNormalized = xRads / Math.PI; // [-0.5, 0.5]
    const x = (xNormalized + 0.5) * canvas.width;

    let y = 0.5 * canvas.height;
    if (s.loc.length > 2) {
      y = Math.atan2(s.loc[2], s.loc[1]); // TODO  * canvas.height
    }

    // const x = ((s.loc[0] + 200) / 400) * canvas.width;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}

// TODO delete https://github.com/darthwalsh/scriptgraphics when this is done
