/// <reference path="level.ts" />
/// <reference path="matrix.ts" />

module World {
  export class Shape {
    size: number;
    loc: number[];

    constructor(s: number, ...l: number[]) {
      this.size = s;
      this.loc = l;
    }
  }

  function intersects(a: Shape, b: Shape): boolean {
    return distance(a, b) < a.size + b.size;
  }

  function distance(a: Shape, b: Shape): number {
    let aLocs = a.loc;
    let bLocs = b.loc;

    if (aLocs.length != bLocs.length)
      assertThrow(".length");

    //dist = sqrt((ax - bx)^2 + (ay - by)^2 + ...)
    let sum = 0;
    for (let i = 0; i < aLocs.length; ++i) {
      let diff = aLocs[i] - bLocs[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  export class Game {
    player: Shape;
    goals: Shape[];
    dim: number;
    level = 1;
    tick = 0;

    constructor(dim: number) {
      this.dim = dim;
      this.player = new Shape(20, ...this.makeArray(0));
      this.updateGoal();
    }

    makeArray(n: number) {
      let arr: number[] = [];
      for (let d = 0; d < this.dim; ++d) {
        arr.push(n);
      }
      return arr;
    }

    update(keydown: any) {
      ++this.tick;
      const tickFactor = 80;
      this.goals.forEach(goal => goal.size = 40 -
        Math.abs((this.tick % (2 * tickFactor)) - tickFactor) / 4);

      let delta = this.makeArray(0);

      let speed = -10;
      let turnSpeed = 5;
      if (keydown.left) {
        delta[0] -= speed;
      }
      if (keydown.right) {
        delta[0] += speed;
      }

      if (this.dim >= 2) {
        if (keydown.up) {
          delta[1] -= speed;
        }
        if (keydown.down) {
          delta[1] += speed;
        }

        let angle = 0;
        if (keydown.a) {
          angle += turnSpeed;
        }
        if (keydown.d) {
          angle -= turnSpeed;
        }

        // Transform 
        let angleRad = angle * Math.PI / 180;
        var transform = Matrix.From([
          [Math.cos(angleRad), Math.sin(angleRad)],
          [-Math.sin(angleRad), Math.cos(angleRad)]
        ])
        var vector = Matrix.From(delta.map(n => [n]));
        delta = transform.mul(vector).n[0];
      }

      for (let i = 0; i < this.dim; ++i) {
        for (let g of this.goals) {
          g.loc[i] += delta[i];
        }
      }

      for (let i = this.goals.length - 1; i >= 0; --i) {
        if (intersects(this.goals[i], this.player)) {
          this.goals.splice(i, 1);
        }
      }

      if (this.goals.length == 0) {
        ++this.level;
        this.updateGoal();
      }

    }

    private updateGoal() {
      const width = 100;

      let surface = Level.GetSurface(this.dim, this.level);
      this.goals = surface.map(arr => new Shape(30, ...(arr.map(i => width * i))));
    }
  }
}