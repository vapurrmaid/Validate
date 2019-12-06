export class ValidateNegation {
  public static inclusiveBetween(start: number, end: number, value: number, message: string): void {
    if (!(value < start || value > end)) {
      throw new RangeError(message);
    }
  }

  public static isTrue(expression: boolean, message: string): void {
    if (expression) {
      throw new Error(message);
    }
  }
}
