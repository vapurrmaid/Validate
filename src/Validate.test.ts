import { Validate } from "./Validate";

describe("Validate StaticChainableProperties", () => {
  describe("Chaining", () => {
    it("does not throw", () => {
      expect(() => {
        Validate.isNull(null, "test")
          .isNull(null, "test")
          .isTrue(true, "test")
          .isTrue(true, "test");
      }).not.toThrow();
    });

    it("negation does not throw", () => {
      expect(() => {
        Validate.not()
          .isNull(5, "test")
          .isNull("test", "test")
          .isTrue(false, "test")
          .isTrue(false, "test");
      }).not.toThrow();
    });
  });

  describe("isDefined", () => {
    it("does not throw for defined values", () => {
      [0, null, false].forEach((val) => {
        expect(() => Validate.isDefined(val, "test")).not.toThrow();
      });
    });

    it("throws with the provided message for undefined", () => {
      expect(() => Validate.isDefined(undefined, "test")).toThrowError("test");
    });
  });

  describe("isDefined Negation", () => {
    it("does not throw for undefined", () => {
      expect(() => Validate.not().isDefined(undefined, "test")).not.toThrow();
    });

    it("throws with the provided message for defined values", () => {
      [0, null, false].forEach((val) => {
        expect(() => Validate.not().isDefined(val, "test")).toThrowError("test");
      });
    });
  });

  describe("isNull", () => {
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

  describe("isNull Negation", () => {
    it("throws with the provided message if the value is null", () => {
      function shouldThrow(): void {
        Validate.not().isNull(null, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it.each([undefined, 0, NaN, false, [], {}])("does not throw for value %s", (value: unknown) => {
      function shouldNotThrow(): void {
        Validate.not().isNull(value, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });
  });

  describe("isNullish", () => {
    it("does not throw for null and undefined", () => {
      [null, undefined].forEach((val) => {
        expect(() => Validate.isNullish(val, "test")).not.toThrow();
      });
    });

    it("throws with the provided message for non-nullish values", () => {
      [0, false, {}, [], ""].forEach((val) => {
        expect(() => Validate.isNullish(val, "test")).toThrowError("test");
      });
    });
  });

  describe("isNullish Negation", () => {
    it("does not throw for non-nullish values", () => {
      [0, false, {}, [], ""].forEach((val) => {
        expect(() => Validate.not().isNullish(val, "test")).not.toThrow();
      });
    });

    it("throws with the provided message for null and undefined", () => {
      [null, undefined].forEach((val) => {
        expect(() => Validate.not().isNullish(val, "test")).toThrowError("test");
      });
    });
  });

  describe("isTrue", () => {
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

  describe("isTrue Negation", () => {
    it("does not throw for false expressions", () => {
      function shouldNotThrow(): void {
        Validate.not().isTrue(false, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message for true expressions", () => {
      function shouldThrow(): void {
        Validate.not().isTrue(true, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });
});

describe("Validate ChainableNumberProperties", () => {
  describe("Chaining", () => {
    it("does not throw", () => {
      expect(() => {
        Validate.n(5)
          .exclusiveBetween(1, 10, "test")
          .exclusiveBetween(1, 10, "test")
          .inclusiveBetween(5, 6, "test")
          .inclusiveBetween(5, 6, "test")
          .is(5, "test")
          .is(5, "test")
          .isEqualOrGreaterThan(5, "test")
          .isEqualOrGreaterThan(4, "test")
          .isEqualOrLessThan(5, "test")
          .isEqualOrLessThan(6, "test");
      }).not.toThrow();
    });

    it("Negation does not throw", () => {
      expect(() => {
        Validate.not()
          .n(5)
          .exclusiveBetween(5, 10, "test")
          .exclusiveBetween(5, 10, "test")
          .inclusiveBetween(1, 4, "test")
          .inclusiveBetween(1, 4, "test")
          .is(6, "test")
          .is(6, "test")
          .isEqualOrGreaterThan(6, "test")
          .isEqualOrGreaterThan(6, "test")
          .isEqualOrLessThan(4, "test")
          .isEqualOrLessThan(4, "test");
      }).not.toThrow();
    });
  });

  describe("exclusiveBetween", () => {
    it("does not throw if the value is within bounds", () => {
      function shouldNotThrow(): void {
        Validate.n(5).exclusiveBetween(0, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is on the lower bound", () => {
      function shouldThrow(): void {
        Validate.n(0).exclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is on the upper bound", () => {
      function shouldThrow(): void {
        Validate.n(10).exclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is not within bounds", () => {
      function shouldThrow(): void {
        Validate.n(2).exclusiveBetween(0, 1, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("exclusiveBetween Negation", () => {
    it("does not throw if the value is out of bounds", () => {
      function shouldNotThrow(): void {
        Validate.not().n(2).exclusiveBetween(0, 1, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the lower bound", () => {
      function shouldNotThrow(): void {
        Validate.not().n(0).exclusiveBetween(0, 1, "test");
      }
      expect(shouldNotThrow).not.toThrowError("test");
    });

    it("does not throw if the value is on the upper bound", () => {
      function shouldNotThrow(): void {
        Validate.not().n(10).exclusiveBetween(0, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError("test");
    });

    it("throws with the provided message if the value is within bounds", () => {
      function shouldThrow(): void {
        Validate.not().n(5).exclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("inclusiveBetween", () => {
    it("does not throw if the value is within bounds", () => {
      function shouldNotThrow(): void {
        Validate.n(5).inclusiveBetween(0, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the lower bound", () => {
      function shouldNotThrow(): void {
        Validate.n(0).inclusiveBetween(0, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("does not throw if the value is on the upper bound", () => {
      function shouldNotThrow(): void {
        Validate.n(10).inclusiveBetween(0, 10, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is not within bounds", () => {
      function shouldThrow(): void {
        Validate.n(2).inclusiveBetween(0, 1, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("inclusiveBetween Negation", () => {
    it("does not throw if the value is out of bounds", () => {
      function shouldNotThrow(): void {
        Validate.not().n(2).inclusiveBetween(0, 1, "test");
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it("throws with the provided message if the value is on the lower bound", () => {
      function shouldThrow(): void {
        Validate.not().n(0).inclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is on the upper bound", () => {
      function shouldThrow(): void {
        Validate.not().n(10).inclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });

    it("throws with the provided message if the value is within bounds", () => {
      function shouldThrow(): void {
        Validate.not().n(5).inclusiveBetween(0, 10, "test");
      }
      expect(shouldThrow).toThrowError("test");
    });
  });

  describe("is", () => {
    it("does not throw if the values are identical", () => {
      expect(() => {
        Validate.n(5).is(5, "test");
      }).not.toThrow();
    });

    it("throws with the provided message if the values are not identical", () => {
      expect(() => {
        Validate.n(5).is(6, "test");
      }).toThrowError("test");
    });
  });

  describe("is Negation", () => {
    it("does not throw if the values are not identical", () => {
      expect(() => {
        Validate.not().n(5).is(0, "test");
      }).not.toThrow();
    });

    it("throws with the provided message if the values are identical", () => {
      expect(() => {
        Validate.not().n(0).is(0, "test");
      }).toThrowError("test");
    });
  });

  describe("isEqualOrGreaterThan", () => {
    it("does not throw if the number is >= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.n(5).isEqualOrGreaterThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is not >= value", () => {
      [5, 6, 7].forEach((val) => {
        expect(() => {
          Validate.n(4).isEqualOrGreaterThan(val, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isEqualOrGreaterThan Negation", () => {
    it("does not throw if the number is not >= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.not().n(2).isEqualOrGreaterThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is >= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.not().n(5).isEqualOrGreaterThan(val, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isEqualOrLessThan", () => {
    it("does not throw if the number is <= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.n(3).isEqualOrLessThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is not <= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.n(6).isEqualOrLessThan(val, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isEqualOrLessThan Negation", () => {
    it("does not throw if the number is not <= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.not().n(6).isEqualOrLessThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is <= value", () => {
      [3, 4, 5].forEach((val) => {
        expect(() => {
          Validate.not().n(3).isEqualOrLessThan(val, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isGreaterThan", () => {
    it("does not throw if the number is > value", () => {
      [3, 4].forEach((val) => {
        expect(() => {
          Validate.n(5).isGreaterThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is not > value", () => {
      [4, 5].forEach((val) => {
        expect(() => {
          Validate.n(val).isGreaterThan(5, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isGreaterThan Negation", () => {
    it("does not throw if the number is not > value", () => {
      [3, 4].forEach((val) => {
        expect(() => {
          Validate.not().n(val).isGreaterThan(4, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is > value", () => {
      [3, 4].forEach((val) => {
        expect(() => {
          Validate.not().n(5).isGreaterThan(val, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isLessThan", () => {
    it("does not throw if the number is < value", () => {
      [3, 4].forEach((val) => {
        expect(() => {
          Validate.n(2).isLessThan(val, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is not < value", () => {
      [4, 5].forEach((val) => {
        expect(() => {
          Validate.n(val).isLessThan(4, "test");
        }).toThrowError("test");
      });
    });
  });

  describe("isLessThan Negation", () => {
    it("does not throw if the number is not < value", () => {
      [4, 5].forEach((val) => {
        expect(() => {
          Validate.not().n(val).isLessThan(4, "test");
        }).not.toThrow();
      });
    });

    it("throws with the provided message if the number is < value", () => {
      [3, 4].forEach((val) => {
        expect(() => {
          Validate.not().n(val).isLessThan(5, "test");
        }).toThrowError("test");
      });
    });
  });
});
