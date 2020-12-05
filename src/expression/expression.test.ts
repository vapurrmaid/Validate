import {
  exclusiveBetween,
  inclusiveBetween,
  isDefined,
  isEqualOrGreaterThan,
  isEqualOrLessThan,
  isGreaterThan,
  isLessThan,
  isNull,
  isNullish,
  isTrue,
} from ".";

describe("Expression", () => {
  describe("exclusiveBetween", () => {
    test.each([
      [1, 3, 2, true],
      [1, 3, 3, false],
      [1, 3, 4, false],
    ])(`exclusiveBetween({ %p, %p }, %p) is %p`, (start, end, input, output) => {
      expect(exclusiveBetween({ start, end }, input)).toBe(output);
    });
  });

  describe("inclusiveBetween", () => {
    test.each([
      [1, 3, 2, true],
      [1, 3, 3, true],
      [1, 3, 4, false],
    ])(`inclusiveBetween({ %p, %p }, %p) is %p`, (start, end, input, output) => {
      expect(inclusiveBetween({ start, end }, input)).toBe(output);
    });
  });

  describe("isDefined", () => {
    test.each([
      [undefined, false],
      [null, true],
      [false, true],
      ["", true],
      [0, true],
      [{}, true],
      [[], true],
    ])(`isDefined(%p) is %p`, (input, output) => {
      expect(isDefined(input)).toBe(output);
    });
  });

  describe("isEqualOrGreaterThan", () => {
    test.each([
      [2, 1, false],
      [2, 2, true],
      [2, 3, true],
    ])(`isEqualOrGreaterThan(%p, %p) is %p`, (input, n, output) => {
      expect(isEqualOrGreaterThan(input, n)).toBe(output);
    });
  });

  describe("isEqualOrLessThan", () => {
    test.each([
      [2, 1, true],
      [2, 2, true],
      [2, 3, false],
    ])(`isEqualOrLessThan(%p, %p) is %p`, (input, n, output) => {
      expect(isEqualOrLessThan(input, n)).toBe(output);
    });
  });

  describe("isGreaterThan", () => {
    test.each([
      [2, 1, false],
      [2, 2, false],
      [2, 3, true],
    ])(`isGreaterThan(%p, %p) is %p`, (input, n, output) => {
      expect(isGreaterThan(input, n)).toBe(output);
    });
  });

  describe("isLessThan", () => {
    test.each([
      [2, 1, true],
      [2, 2, false],
      [2, 3, false],
    ])(`isLessThan(%p, %p) is %p`, (input, n, output) => {
      expect(isLessThan(input, n)).toBe(output);
    });
  });

  describe("isNull", () => {
    test.each([
      [undefined, false],
      [null, true],
      [false, false],
      ["", false],
      [0, false],
      [{}, false],
      [[], false],
    ])(`isNull(%p) is %p`, (input, output) => {
      expect(isNull(input)).toBe(output);
    });
  });

  describe("isNullish", () => {
    test.each([
      [undefined, true],
      [null, true],
      [false, false],
      ["", false],
      [0, false],
      [{}, false],
      [[], false],
    ])(`isNullish(%p) is %p`, (input, output) => {
      expect(isNullish(input)).toBe(output);
    });
  });

  describe("isTrue", () => {
    test.each([
      [true, true],
      [false, false],
      [!!undefined, false],
      [!!1, true],
    ])(`isTrue(%p) is %p`, (input, output) => {
      expect(isTrue(input)).toBe(output);
    });
  });
});
