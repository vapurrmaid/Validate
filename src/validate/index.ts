import * as Expression from "../expression";

/**
 * StaticChainableProperties represents the properties existing on the root
 * Validate object. These properties all return `StaticChainableProperties` so
 * that they can be chained continually in succession.
 * @see ValidateProperties
 */
interface StaticChainableProperties {
  /**
   * Validates that the provided value is `undefined`; otherwise throws an
   * `Error` with the provided message
   * @param value Value to be validated as `undefined`
   * @param message `Error` message
   * @throws `Error` if the value is not `undefined`
   */
  isDefined(value: unknown, message: string): StaticChainableProperties;
  /**
   * Validates that the provided value is `null`; otherwise throws an `Error`
   * with the provided message
   * @param value Value to be validated as `null`
   * @param message `Error` message
   * @throws `Error` if the value is not `null`
   */
  isNull(value: unknown, message: string): StaticChainableProperties;
  /**
   * Validates that the proided value is `null` or `undefined`; otherwise
   * throws an `Error` with the provided message
   * @param value Value to be validated as `null` or `undefined`
   * @param message `Error` message
   * @throws `Error` is the value is not `null` or `undefined`
   */
  isNullish(value: unknown, message: string): StaticChainableProperties;
  /**
   * Validates that the provided expression is `true`; otherwise throws an
   * `Error` with the provided message
   * @param expression Expression to be validated
   * @param message `Error` message
   * @throws `Error` if the expression is not `true`
   */
  isTrue(value: unknown, message: string): StaticChainableProperties;
}

/**
 * ChainableNumberProperties are like StaticChainableProperties except that
 * they exist off of a nested property, `n`, of Validate. These properties all
 * return ChainableNumberProperties and use the same value of `n`.
 * @see StaticChainableProperties
 * @see ValidateProperties
 */
interface ChainableNumberProperties {
  /**
   * Validates that the property `n` is exclusively between the start and end;
   * otherwise throws a `RangeError`.
   * @param start the exclusive start value
   * @param end the exclusive end value
   * @param message `RangeError` message
   * @throws `RangeError` if the value is outside the boundaries
   */
  exclusiveBetween(start: number, end: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is inclusively between the start and end;
   * otherwise throws a `RangeError`.
   * @param start the inclusive start value
   * @param end the inclusive end value
   * @param message `RangeError` message
   * @throws `RangeError` if the value is outside the boundaries
   */
  inclusiveBetween(start: number, end: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is exactly the provided value; otherwise
   * throws an `Error`.
   * @param value The value the property `n` should be
   * @param message `Error` message
   * @throws `Error` if the values are not equal
   */
  is(value: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is equal to or greater than a value;
   * otherwise, throws a `RangeError`.
   * @param value The value `n` should be equal to or greater than
   * @param message `RangeError` message
   * @throws `RangeError` if `n` is not equal to or greater than the value
   */
  isEqualOrGreaterThan(value: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is equal to or less than a value;
   * otherwise, throws a `RangeError`.
   * @param value The value `n` should be equal to or less than
   * @param message `RangeError` message
   * @throws `RangeError` if `n` is not equal to or less than the value
   */
  isEqualOrLessThan(value: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is greater than a value; otherwise throws
   * a `RangeError`.
   * @param value The value `n` should be greater than
   * @param message `RangeError` message
   * @throws `RangeError` if `n` is not greater than the value
   */
  isGreaterThan(value: number, message: string): ChainableNumberProperties;
  /**
   * Validates that the property `n` is less than a value; otherwise throws
   * a `RangeError`.
   * @param value The value `n` should be less than
   * @param message `RangeError` message
   * @throws `RangeError` if `n` is not less than the value
   */
  isLessThan(value: number, message: string): ChainableNumberProperties;
}

/**
 * Validate object implements StaticChainableProperties and
 * ChainableNumberProperties.
 * @see StaticChainableProperties
 * @see ChainableNumberProperties
 */
export interface ValidateProperties extends StaticChainableProperties {
  /**
   * `n` is a number used by all validators on the ChainableNumberProperties
   * interface
   */
  n(n: number): ChainableNumberProperties;
}

/**
 * Validate object that implements ValidateProperties in addition to a negation
 * property that inverses logic for all ValidateProperties.
 * @see ValidateProperties
 */
export interface ValidatePropertiesWithNegation extends ValidateProperties {
  /**
   * Implements the negation of all properties on the ValidateProperties
   * interface.
   * @remark `not` does not nest itself (ie: Validate.not.not)
   */
  not(): ValidateProperties;
}

/**
 * Picks all StaticChainableProperties from a Validate-like object.
 */
const pickStaticChain = (
  v: ValidateProperties | ValidatePropertiesWithNegation
): StaticChainableProperties => ({
  isDefined: v.isDefined,
  isNull: v.isNull,
  isNullish: v.isNullish,
  isTrue: v.isTrue,
});

export const Validate: ValidatePropertiesWithNegation = {
  //-- Static Chainable Properties ------------------------------------------//
  isDefined(value: unknown, message: string) {
    if (!Expression.isDefined(value)) {
      throw new Error(message);
    }
    return pickStaticChain(this);
  },

  isNull(value: unknown, message: string) {
    if (!Expression.isNull(value)) {
      throw new Error(message);
    }
    return pickStaticChain(this);
  },

  isNullish(value: unknown, message: string) {
    if (!Expression.isNullish(value)) {
      throw new Error(message);
    }
    return pickStaticChain(this);
  },

  isTrue(expression: boolean, message: string) {
    if (!Expression.isTrue(expression)) {
      throw new Error(message);
    }
    return pickStaticChain(this);
  },

  //-- Chainable Number Properties ------------------------------------------//

  n(n: number) {
    return {
      exclusiveBetween(start: number, end: number, message: string) {
        if (!Expression.exclusiveBetween({ start, end }, n)) {
          throw new RangeError(message);
        }
        return this;
      },

      inclusiveBetween(start: number, end: number, message: string) {
        if (!Expression.inclusiveBetween({ start, end }, n)) {
          throw new RangeError(message);
        }
        return this;
      },

      is(value: number, message: string): ChainableNumberProperties {
        if (n !== value) {
          throw new Error(message);
        }
        return this;
      },

      isEqualOrGreaterThan(value: number, message: string) {
        if (!Expression.isEqualOrGreaterThan(value, n)) {
          throw new RangeError(message);
        }
        return this;
      },

      isEqualOrLessThan(value: number, message: string) {
        if (!Expression.isEqualOrLessThan(value, n)) {
          throw new RangeError(message);
        }
        return this;
      },

      isGreaterThan(value: number, message: string) {
        if (!Expression.isGreaterThan(value, n)) {
          throw new RangeError(message);
        }
        return this;
      },

      isLessThan(value: number, message: string) {
        if (!Expression.isLessThan(value, n)) {
          throw new RangeError(message);
        }
        return this;
      },
    };
  },

  //-- Negation -------------------------------------------------------------//
  not(): ValidateProperties {
    return {
      isDefined(value: unknown, message: string) {
        if (Expression.isDefined(value)) {
          throw new Error(message);
        }
        return pickStaticChain(this);
      },

      isNull(value: unknown, message: string) {
        if (Expression.isNull(value)) {
          throw new Error(message);
        }
        return pickStaticChain(this);
      },

      isNullish(value: unknown, message: string) {
        if (Expression.isNullish(value)) {
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
          },
        };
      },
    };
  },
};
