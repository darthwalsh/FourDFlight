module Matrix {
  export class Matrix {
    n: number[][];
    constructor(w: number, h: number) {
      this.n = [];
      for (let x = 0; x < w; ++x) {
        let arr = [];
        for (let y = 0; y < h; ++y) {
          arr.push(0);
        }
        this.n.push(arr);
      }
    }

    get W() { return this.n.length; }
    get H() { return this.n[0].length; }

    add(m: Matrix): Matrix {
      if (this.W !== m.W || this.H !== m.H)
        throw "non-compatible dims!";

      var sum = new Matrix(this.W, this.H);
      for (let x = 0; x < this.W; ++x) {
        for (let y = 0; y < this.H; ++y) {
          sum.n[x][y] = this.n[x][y] + m.n[x][y];
        }
      }
      return sum;
    }

    mul(m: Matrix): Matrix {
      if (this.W !== m.H)
        throw "non-compatible dims!";

      var prod = new Matrix(m.W, this.H);
      for (let x = 0; x < prod.W; ++x) {
        for (let y = 0; y < prod.H; ++y) {
          for (let i = 0; i < this.W; ++i) {
            prod.n[x][y] += this.n[i][y] * m.n[x][i];
          }
        }
      }
      return prod;
    }
  }

  export function From(n: number[][]) {
    var m = new Matrix(n[0].length, n.length);

    for (let x = 0; x < m.W; ++x) {
      for (let y = 0; y < m.H; ++y) {
        m.n[x][y] = n[y][x];
      }
    }
    return m;
  }

  /*
  export function Test() {
    var m = new Matrix(1, 2);
    AreEqual(1, m.W);
    AreEqual(2, m.H);

    m.n[0][1] = 2;

    var ans = new Matrix(1, 2);
    ans.n[0][1] = 4;
    AreEqual(ans, m.add(m));

    var A = new Matrix(3, 1);
    A.n[0][0] = 1;
    A.n[1][0] = 2;
    A.n[2][0] = 3;

    var A2 = From([
      [1,2,3]
    ]);
    AreEqual(A, A2);

    var B = From([
      [10],
      [5],
      [4]
    ]);

    var AB = From([[10 + 10 + 12]]);
    AreEqual(AB, A.mul(B));

    AreEqual(20, B.mul(A).n[1][0]);

    var sq = From([
      [2,3],
      [4,5]
    ]);
    AreEqual(From([[6],[10]]), sq.mul(m));
  }
  function AreEqual(expected: any, actual: any) {
    expected = JSON.stringify(expected);
    actual = JSON.stringify(actual);
    console.assert(expected === actual, `${expected} !== ${actual}`);
    console.log(`${expected} passed`);
  }//*/
}