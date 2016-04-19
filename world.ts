module World {
 export class Point {
  locs: number[];
  
  constructor(...l: number[]) {
   this.locs = l;
  }
 }

 export class NSphere {
  loc: Point;
  size: number;
  
  constructor(l: Point, s: number) {
   this.loc = l;
   this.size = s;
  }
 }

 export class Player {
  place: NSphere;
 }

 // TODO should pulse bright and dark
 export class Goal {
  place: NSphere;
 }

 export class Obstacle {
  color = "#FF0000";
  place: NSphere;
 }

 function intersects(a: NSphere, b: NSphere): boolean {
  return distance(a.loc, b.loc) < a.size + b.size;
 }
 
 function distance(a: Point, b: Point): number {
  let aLocs = a.locs;
  let bLocs = b.locs;
  
  if (aLocs.length != bLocs.length)
    throw ".length";
  
  //dist = sqrt((ax - bx)^2 + (ay - by)^2 + ...)
  let sum = 0;
  for (var i = 0; i < aLocs.length; ++i) {
   let diff = aLocs[i] - bLocs[i];
   sum += diff * diff;
  }
  return Math.sqrt(sum);
 }
 
 export class Game {
  player = new Player();
  goal = new Goal();
  points = 0;
  tick = 0;
  
  constructor() {
   this.player.place = new World.NSphere(new World.Point(100, 100), 20);
   this.goal.place = new World.NSphere(new World.Point(100, 100), 30);
   this.moveGoal();
  }
  
  update(keydown: any) {
   ++this.tick;
   const tickFactor = 80;
   this.goal.place.size = 40 - 
     Math.abs((this.tick % (2*tickFactor)) - tickFactor) / 4;
   
   var speed = 10;
   if (keydown.left) {
     this.player.place.loc.locs[0] -= speed;
   }
   if (keydown.right) {
     this.player.place.loc.locs[0] += speed;
   }
   if (keydown.up) {
     this.player.place.loc.locs[1] -= speed;
   }
   if (keydown.down) {
     this.player.place.loc.locs[1] += speed;
   }
   
   this.player.place.loc.locs[0] = clamp(
     this.player.place.loc.locs[0], this.player.place.size, canvas.width - this.player.place.size);
   this.player.place.loc.locs[1] = clamp(
     this.player.place.loc.locs[1], this.player.place.size, canvas.height - this.player.place.size);
     
   if (intersects(this.goal.place, this.player.place)) {
    ++this.points;
    this.moveGoal();
   }
  }
  
  private moveGoal() {
   const width = 1000;
   const height = 700; //TODO
   
   this.goal.place.loc.locs[0] = Math.floor(Math.random() * width);
   this.goal.place.loc.locs[1] = Math.floor(Math.random() * height);
   
   if (distance(this.goal.place.loc, this.player.place.loc) < 100) {
    this.moveGoal();
   }
  }
 }
}