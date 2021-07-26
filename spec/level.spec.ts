import "jasmine";

import {Level} from "../level";

describe("Level", () => {
  const expected = [
    {d: 1, l: 1, e: [[-1], [1]]},
    {d: 1, l: 2, e: [[-2], [2]]},
    {
      d: 2,
      l: 1,
      e: [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ],
    },
    {
      d: 2,
      l: 2,
      e: [
        [-2, -2],
        [-2, 0],
        [-2, 2],
        [0, -2],
        [0, 2],
        [2, -2],
        [2, 0],
        [2, 2],
      ],
    },
    {
      d: 3,
      l: 1,
      e: [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
      ],
    },
  ];

  for (let i of expected) {
    it(`GetSurface(${i.d}, ${i.l}) should`, () => {
      let actual = Level.GetSurface(i.d, i.l);
      expect(actual).toEqual(i.e);
    });
  }
});
