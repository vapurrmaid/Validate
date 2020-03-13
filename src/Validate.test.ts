import { Validate } from "./Validate";

describe("Validate", () => {
  describe("Validate.exclusiveBetween", () => {
    it("does not throw if the value is within bounds", () => {
      function shouldNotThrow(): void {
        Validate.exclusiveBetween(0, 10, 5, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is on the lower bound", () => {
      function shouldThrow(): void {
        Validate.exclusiveBetween(0, 10, 0, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is on the upper bound", () => {
      function shouldThrow(): void {
        Validate.exclusiveBetween(0, 10, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is not within bounds", () => {
      function shouldThrow(): void {
        Validate.exclusiveBetween(0, 1, 2, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("Validate.inclusiveBetween", () => {
    it("does not throw if the value is within bounds", () => {
      function shouldNotThrow(): void {
        Validate.inclusiveBetween(0, 10, 5, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the lower bound", () => {
      function shouldNotThrow(): void {
        Validate.inclusiveBetween(0, 10, 0, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the upper bound", () => {
      function shouldNotThrow(): void {
        Validate.inclusiveBetween(0, 10, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is not within bounds", () => {
      function shouldThrow(): void {
        Validate.inclusiveBetween(0, 1, 2, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("Validate.isNull", () => {
    it("does not throw for null values", () => {
      function shouldNotThrow(): void {
        Validate.isNull(null, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it.each([undefined, 0, NaN, false, [], {}])(
      "throws with the provided message for value %s",
      (value: unknown) => {
        function shouldThrow(): void {
          Validate.isNull(value, "test");
        }
        expect(shouldThrow).toThrowError("test");
      }
    );
  });

  describe("Validate.isTrue", () => {
    it("does not throw for true expressions", () => {
      function shouldNotThrow(): void {
        Validate.isTrue(true, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message for false expressions", () => {
      function shouldThrow(): void {
        Validate.isTrue(false, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("Valid.not", () => {
    it("is defined", () => {
      expect(Validate.not).toBeDefined();
    });
  });

  describe("Chaining", () => {
    it("works", () => {
      expect(() => {
        Validate.isNull(null, "")
          .isNull(null, "")
          .isTrue(true, "")
          .isTrue(true, "");
      }).not.toThrow();
    });
  });
});
