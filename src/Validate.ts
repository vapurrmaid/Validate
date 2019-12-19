import { ValidateNegation } from './ValidateNegation';

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
  public static exclusiveBetween(start: number, end: number, value: number, message: string): void {
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
  public static inclusiveBetween(start: number, end: number, value: number, message: string): void {
    if (value < start || value > end) {
      throw new RangeError(message);
    }
  }

  /**
   * Validates that the provided expression is true; otherwise throws an
   * Error with the provided message.
   *
   * @param expression Expression to be validated
   * @param message Error message
   * @throws Error if the expression is not true
   */
  public static isTrue(expression: boolean, message: string): void {
    if (!expression) {
      throw new Error(message);
    }
  }

  /**
   * @returns A class implementing the negation of Validate.
   */
  public static get not(): ValidateNegation {
    return ValidateNegation;
  }
}
