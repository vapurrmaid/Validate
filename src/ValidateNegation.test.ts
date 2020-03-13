import { ValidateNegation } from "./ValidateNegation";

describe("ValidateNegation", () => {
  describe("ValidateNegation.exclusiveBetween", () => {
    it("does not throw if the value is out of bounds", () => {
      function shouldNotThrow(): void {
        ValidateNegation.exclusiveBetween(0, 1, 2, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the lower bound", () => {
      function shouldNotThrow(): void {
        ValidateNegation.exclusiveBetween(0, 1, 0, "test");
      }
      expect(shouldNotThrow).not.toThrowError("test");
    });

    it("does not throw if the value is on the upper bound", () => {
      function shouldNotThrow(): void {
        ValidateNegation.exclusiveBetween(0, 10, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError("test");
    });

    it("throws with the provided message if the value is within bounds", () => {
      function shouldThrow(): void {
        ValidateNegation.exclusiveBetween(0, 10, 5, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("ValidateNegation.inclusiveBetween", () => {
    it("does not throw if the value is out of bounds", () => {
      function shouldNotThrow(): void {
        ValidateNegation.inclusiveBetween(0, 1, 2, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is on the lower bound", () => {
      function shouldThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 0, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is on the upper bound", () => {
      function shouldThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is within bounds", () => {
      function shouldThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 5, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("ValidateNegation.isNull", () => {
    it("throws with the provided message if the value is null", () => {
      function shouldThrow(): void {
        ValidateNegation.isNull(null, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it.each([undefined, 0, NaN, false, [], {}])(
      "does not throw for value %s",
      (value: unknown) => {
        function shouldNotThrow(): void {
          ValidateNegation.isNull(value, "test");
        }
        expect(shouldNotThrow).not.toThrowError();
      }
    );
  });

  describe("ValidateNegation.isTrue", () => {
    it("does not throw for false expressions", () => {
      function shouldNotThrow(): void {
        ValidateNegation.isTrue(false, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message for true expressions", () => {
      function shouldThrow(): void {
        ValidateNegation.isTrue(true, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("Chaining", () => {
    it("works", () => {
      expect(() => {
        ValidateNegation.isNull("hello", "")
          .isNull("hello", "")
          .isTrue(false, "")
          .isTrue(false, "");
      }).not.toThrow();
    });
  });
});
