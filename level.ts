function MultiPermutations<T>(arr: T[], count: number): T[][] {
  if (count == 0) {
    return [[]];
  }
  let rec = MultiPermutations(arr, count - 1);
  let ans: T[][] = [];
  for (let r of rec) {
    for (let e of arr) {
      let copy = r.slice();
      copy.push(e);
      ans.push(copy);
    }
  } 
  return ans;
}

export default function GetSurface(dim: number, level: number): number[][] {
  let set: number[] = [];
  for (let i = -level; i <= level; i += 2) {
    set.push(i);
  }
  let perms = MultiPermutations(set, dim);
  return perms.filter(arr => arr.indexOf(level) >= 0 || arr.indexOf(-level) >= 0);
}
