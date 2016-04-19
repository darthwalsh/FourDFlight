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

 //TODO no color
 export class Player {
  color = "#00FFFF";
  place: NSphere;
 }

 // TODO should pulse bright and dark
 export class Goal {
  color = "#0000FF";
  place: NSphere;
 }

 export class Obstacle {
  color = "#FF0000";
  place: NSphere;
 }

 export function intersects(a: NSphere, b: NSphere): boolean {
  let aLocs = a.loc.locs;
  let bLocs = b.loc.locs;
  
  if (aLocs.length != bLocs.length)
    throw ".length";
  
  //dist = sqrt((ax - bx)^2 + (ay - by)^2 + ...)
  let sum = 0;
  for (var i = 0; i < aLocs.length; ++i) {
   let diff = aLocs[i] - bLocs[i];
   sum += diff * diff;
  }
  let dist = Math.sqrt(sum);
  
  return dist > a.size + b.size;
 }
}