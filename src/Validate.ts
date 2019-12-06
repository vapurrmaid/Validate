import { ValidateNegation } from './ValidateNegation';

/**
 * Class assisting in validation with maintainable, readable expressions.
 * Inspired by the Java Package org.apache.commons.lang3
 *
 * @see {@link https://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/Validate.html|Validate}
 */
export class Validate {
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

  public static get not(): ValidateNegation {
    return ValidateNegation;
  }
}
