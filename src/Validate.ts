import { StaticChainableProperties } from "./interface";
import { ValidateNegation } from "./ValidateNegation";

export class Validate {
  /**
   * Validates that the provided number is exclusively between the start and
   * end; otherwise, throws a RangeError.
   *
   * @param start the exclusive start value
   * @param end the exclusive end value
   * @param value the number to validate
   * @param message RangeError message if the value is outside the boundaries
   * @throws RangeError if the value is outside the boundaries
   */
  static exclusiveBetween(
    start: number,
    end: number,
    value: number,
    message: string
  ): void {
    if (value <= start || value >= end) {
      throw new RangeError(message);
    }
  }

  /**
   * Validates that the provided number is inclusively between the start and
   * end; otherwise, throws a RangeError.
   *
   * @param start the inclusive start value
   * @param end the inclusive end value
   * @param value the number to validate
   * @param message RangeError message if the value is outside the boundaries
   * @throws RangeError if the value is outside the boundaries
   */
  static inclusiveBetween(
    start: number,
    end: number,
    value: number,
    message: string
  ): void {
    if (value < start || value > end) {
      throw new RangeError(message);
    }
  }

  /**
   * Validates that the provided value is null; otherwise throws an Error with
   * the provided message.
   *
   * @param value Value to be validated as null
   * @param message Error message
   * @throws Error if the value is not null
   */
  static isNull(value: unknown, message: string): StaticChainableProperties {
    if (value !== null) {
      throw new Error(message);
    }

    return ValidateStaticChain;
  }

  /**
   * Validates that the provided expression is true; otherwise throws an
   * Error with the provided message.
   *
   * @param expression Expression to be validated
   * @param message Error message
   * @throws Error if the expression is not true
   */
  static isTrue(
    expression: boolean,
    message: string
  ): StaticChainableProperties {
    if (!expression) {
      throw new Error(message);
    }

    return ValidateStaticChain;
  }

  /**
   * @returns A class implementing the negation of Validate.
   */
  static get not(): ValidateNegation {
    return ValidateNegation;
  }
}

const ValidateStaticChain: StaticChainableProperties = {
  isNull: Validate.isNull,
  isTrue: Validate.isTrue
};
