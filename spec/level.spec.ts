/// <reference path="../level.ts" />
/// <reference path="../typings/globals/jasmine/index.d.ts" />

describe("1d", () => {
  let dim = 1;
  it("L1", () => {
    expect(Level.GetSurface(dim, 1)).toBe([[-1], [1]]);
  });
});