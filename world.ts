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
  goal: Shape;
  dim: number;
  points = 0;
  tick = 0;
  
  constructor(dim: number) {
   this.dim = dim;
   
   var loc: number[] = [];
   for (var d = 0; d < dim; ++d) {
     loc.push(100);
   }
    
   this.player = new World.Shape(20, ...loc.slice(0));
   this.goal = new World.Shape(30, ...loc.slice(0));
   this.moveGoal();
  }
  
  clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
  }
  
  update(keydown: any) {
   ++this.tick;
   const tickFactor = 80;
   this.goal.size = 40 - 
     Math.abs((this.tick % (2*tickFactor)) - tickFactor) / 4;
   
   var speed = 10;
   if (keydown.left) {
     this.player.loc[0] -= speed;
   }
   if (keydown.right) {
     this.player.loc[0] += speed;
   }
   this.player.loc[0] = this.clamp(
     this.player.loc[0], this.player.size, canvas.width - this.player.size);
   
   if (this.dim >= 2) { 
    if (keydown.up) {
      this.player.loc[1] -= speed;
    }
    if (keydown.down) {
      this.player.loc[1] += speed;
    }
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