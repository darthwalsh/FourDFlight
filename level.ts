/// <reference path="world.ts" />

module Level {
  export function GetSurface(dim: number, level: number): number[][] {
    let set : number[] = [];
    for (let i = level; i >= -level; i -= 2) {
      set.push(i);
    }
    return [];
  }

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

  export function Test() {
    console.log(JSON.stringify(MultiPermutations([0,1], 3)));

    const expected = [
      {d:1, l:1, e:[[-1], [1]]},
      {d:1, l:2, e:[[-2], [2]]},
    ]

    for (let i of expected) {
      let actual = GetSurface(i.d, i.l);
      AreEqual(i.e, actual);
    }
  }

  function AreEqual(expected: any, actual: any) {
    expected = JSON.stringify(expected);
    actual = JSON.stringify(actual);
    console.assert(expected === actual, `${expected} !== ${actual}`)
  }
}