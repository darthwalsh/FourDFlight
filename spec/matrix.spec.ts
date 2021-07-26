import "jasmine";

import Matrix, {CreateMatrix} from "../matrix.js";

describe("Matrix", () => {
  it("w h", () => {
    var m = new Matrix(1, 2);
    expect(m.W).toEqual(1);
    expect(m.H).toEqual(2);
  });
  it("adds", () => {
    var m = new Matrix(1, 2);
    m.n[0][1] = 2;

    var ans = new Matrix(1, 2);
    ans.n[0][1] = 4;
    expect(m.add(m)).toEqual(ans);
  });
  it("From", () => {
    var A = new Matrix(3, 1);
    A.n[0][0] = 1;
    A.n[1][0] = 2;
    A.n[2][0] = 3;

    expect(CreateMatrix([[1, 2, 3]])).toEqual(A);
  });
  it("mul", () => {
    var A = new Matrix(3, 1);
    A.n[0][0] = 1;
    A.n[1][0] = 2;
    A.n[2][0] = 3;

    var B = CreateMatrix([[10], [5], [4]]);

    var AB = CreateMatrix([[10 + 10 + 12]]);
    expect(A.mul(B)).toEqual(AB);

    expect(B.mul(A).n[1][0]).toEqual(20);

    var sq = CreateMatrix([
      [2, 3],
      [4, 5],
    ]);
    var m = new Matrix(1, 2);
    m.n[0][1] = 2;
    expect(CreateMatrix([[6], [10]])).toEqual(sq.mul(m));
  });
});
