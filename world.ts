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
  for (var i = 0; i < aLocs.length; ++i) {
   let diff = aLocs[i] - bLocs[i];
   sum += diff * diff;
  }
  return Math.sqrt(sum);
 }
 
 export class Game {
  player: Shape;
  angle: number;
  goal: Shape;
  dim: number;
  points = 0;
  tick = 0;
  
  constructor(dim: number) {
   this.dim = dim;
   this.player = new World.Shape(20, ...this.makeArray(100));
   this.angle = 0;
   this.goal = new World.Shape(30, ...this.makeArray(100));
   this.moveGoal();
  }
  
  makeArray(n: number) {
    var arr: number[] = [];
    for (var d = 0; d < this.dim; ++d) {
      arr.push(n);
    }
    return arr;
  }
  
  clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
  }
  
  update(keydown: any) {
   ++this.tick;
   const tickFactor = 80;
   this.goal.size = 40 - 
     Math.abs((this.tick % (2*tickFactor)) - tickFactor) / 4;
   
   var delta = this.makeArray(0);
   
   var speed = 10;
   var turnSpeed = 5;
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
    
    if (keydown.a) {
      this.angle += turnSpeed;
    }    
    if (keydown.d) {
      this.angle -= turnSpeed;
    }
   
    // Transform 
    // TODO should be rotation matrix
    var angleRad = this.angle * Math.PI / 180;
    var newDelta = this.makeArray(0);
    newDelta[0] = Math.cos(angleRad) * delta[0] + Math.sin(angleRad) * delta[1];
    newDelta[1] = -Math.sin(angleRad) * delta[0] + Math.cos(angleRad) * delta[1];
    delta = newDelta;
   }
      
   for (var i = 0; i < this.dim; ++i) {
     this.player.loc[i] += delta[i];
   }   
   
   this.player.loc[0] = this.clamp(
     this.player.loc[0], this.player.size, canvas.width - this.player.size);
   if (this.dim >= 2) { 
     this.player.loc[1] = this.clamp(
      this.player.loc[1], this.player.size, canvas.height - this.player.size);
   }
     
   if (intersects(this.goal, this.player)) {
    ++this.points;
    this.moveGoal();
   }
  }
  
  private moveGoal() {
   const width = 500; //TODO
   
   for (var d = 0; d < this.goal.loc.length; ++d) {
     this.goal.loc[d] = Math.floor(Math.random() * width);
   }
   
   if (distance(this.goal, this.player) < 100) {
    this.moveGoal();
   }
  }
 }
}