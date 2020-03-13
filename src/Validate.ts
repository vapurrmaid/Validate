import {
  ChainableNumberProperties,
  StaticChainableProperties,
  ValidateProperties,
  ValidatePropertiesWithNegation
} from "./interface";

interface NumberRange {
  start: number;
  end: number;
}

const Expression = {
  exclusiveBetween(nr: NumberRange, n: number) {
    return n > nr.start && n < nr.end;
  },

  inclusiveBetween(nr: NumberRange, n: number) {
    return n >= nr.start && n <= nr.end;
  },

  isEqualOrGreaterThan(value: number, n: number) {
    return n >= value;
  },

  isEqualOrLessThan(value: number, n: number) {
    return n <= value;
  },

  isGreaterThan(value: number, n: number) {
    return n > value;
  },

  isLessThan(value: number, n: number) {
    return n < value;
  },

  isTrue(expression: boolean) {
    return expression;
  },

  isNull(value: unknown) {
    return value === null;
  }
};

const pickStaticChain = (
  v: ValidateProperties | ValidatePropertiesWithNegation
): StaticChainableProperties => ({
  isNull: v.isNull,
  isTrue: v.isTrue
});

export const Validate: ValidatePropertiesWithNegation = {
  /**
   * Validates that the provided value is null; otherwise throws an Error with
   * the provided message
   * @param value Value to be validated as null
   * @param message Error message
   * @throws Error if the value is not null
   */
  isNull(value: unknown, message: string) {
    if (!Expression.isNull(value)) {
      throw new Error(message);
    }

    return pickStaticChain(this);
  },

  /**
   * Validates that the provided expression is true; otherwise throws an
   * Error with the provided message
   * @param expression Expression to be validated
   * @param message Error message
   * @throws Error if the expression is not true
   */
  isTrue(expression: boolean, message: string) {
    if (!Expression.isTrue(expression)) {
      throw new Error(message);
    }

    return pickStaticChain(this);
  },

  n(n: number) {
    return {
      /**
       * Validates that the provided number is exclusively between the start and
       * end; otherwise throws a RangeError.
       * @param start the exclusive start value
       * @param end the exclusive end value
       * @param message RangeError message
       * @throws RangeError if the value is outside the boundaries
       */
      exclusiveBetween(start: number, end: number, message: string) {
        if (!Expression.exclusiveBetween({ start, end }, n)) {
          throw new RangeError(message);
        }

        return this;
      },

      /**
       * Validates that this number is inclusively between the start and
       * end; otherwise throws a RangeError.
       * @param start the inclusive start value
       * @param end the inclusive end value
       * @param message RangeError message
       * @throws RangeError if the value is outside the boundaries
       */
      inclusiveBetween(start: number, end: number, message: string) {
        if (!Expression.inclusiveBetween({ start, end }, n)) {
          throw new RangeError(message);
        }

        return this;
      },

      /**
       * Validates that this number is exactly the provided value;
       * otherwise throws an Error.
       * @param value The value this number should be
       * @param message Error message
       * @throws Error if the values are not equal
       */
      is(value: number, message: string): ChainableNumberProperties {
        if (n !== value) {
          throw new Error(message);
        }

        return this;
      },

      /**
       * Validates that this number is equal to or greater than a value;
       * otherwise, throws a RangeError.
       * @param value The value this number should be equal to or greater than
       * @param message RangeError message
       * @throws RangeError if the provided number is not equal to or greater than the value
       */
      isEqualOrGreaterThan(value: number, message: string) {
        if (!Expression.isEqualOrGreaterThan(value, n)) {
          throw new RangeError(message);
        }

        return this;
      },

      /**
       * Validates that this number is equal to or less than a value;
       * otherwise, throws a RangeError.
       * @param value The value this number should be equal to or less than
       * @param message RangeError message
       * @throws RangeError if the provided number is not equal to or less than the value
       */
      isEqualOrLessThan(value: number, message: string) {
        if (!Expression.isEqualOrLessThan(value, n)) {
          throw new RangeError(message);
        }

        return this;
      },

      /**
       * Validates that this number is greater than a value; otherwise throws
       * a RangeError.
       * @param value The value this number should be greater than
       * @param message RangeError message
       * @throws RangeError if the provided number is not greater than the value
       */
      isGreaterThan(value: number, message: string) {
        if (!Expression.isGreaterThan(value, n)) {
          throw new RangeError(message);
        }

        return this;
      },

      /**
       * Validates that this number is less than a value; otherwise throws
       * a RangeError.
       * @param value The value this number should be less than
       * @param message RangeError message
       * @throws RangeError if the provided number is not less than the value
       */
      isLessThan(value: number, message: string) {
        if (!Expression.isLessThan(value, n)) {
          throw new RangeError(message);
        }

        return this;
      }
    };
  },

  not(): ValidateProperties {
    return {
      isNull(value: unknown, message: string) {
        if (Expression.isNull(value)) {
          throw new Error(message);
        }

        return pickStaticChain(this);
      },

      isTrue(expression: boolean, message: string) {
        if (Expression.isTrue(expression)) {
          throw new Error(message);
        }

        return pickStaticChain(this);
      },

      n(n: number) {
        return {
          exclusiveBetween(start: number, end: number, message: string) {
            if (Expression.exclusiveBetween({ start, end }, n)) {
              throw new RangeError(message);
            }

            return this;
          },

          inclusiveBetween(start: number, end: number, message: string) {
            if (Expression.inclusiveBetween({ start, end }, n)) {
              throw new RangeError(message);
            }

            return this;
          },

          is(value: number, message: string) {
            if (n === value) {
              throw new Error(message);
            }

            return this;
          },

          isEqualOrGreaterThan(value: number, message: string) {
            if (Expression.isEqualOrGreaterThan(value, n)) {
              throw new RangeError(message);
            }

            return this;
          },

          isEqualOrLessThan(value: number, message: string) {
            if (Expression.isEqualOrLessThan(value, n)) {
              throw new RangeError(message);
            }

            return this;
          },

          isGreaterThan(value: number, message: string) {
            if (Expression.isGreaterThan(value, n)) {
              throw new RangeError(message);
            }

            return this;
          },

          isLessThan(value: number, message: string) {
            if (Expression.isLessThan(value, n)) {
              throw new RangeError(message);
            }

            return this;
          }
        };
      }
    };
  }
};
