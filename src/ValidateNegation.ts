export class ValidateNegation {
  public static isTrue(expression: boolean, message: string): void {
    if (expression) {
      throw new Error(message);
    }
  }
}
