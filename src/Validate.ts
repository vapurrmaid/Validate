/**
 * Class assisting in validation with maintainable, readable expressions.
 * Inspired by the Java Package org.apache.commons.lang3
 *
 * @see https://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/Validate.html
 */
export class Validate {
  /**
   * Validates that the provided expression is true, otherwise throws an
   * exception with the provided message.
   *
   * @param expression Expression to be validated
   * @param message Error message
   * @throws Throws an Error if validation does not pass
   */
  public static isTrue(expression: boolean, message: string): void {
    if (!expression) {
      throw new Error(message);
    }
  }
}
