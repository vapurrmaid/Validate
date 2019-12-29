export class ValidateNegation {
  public static exclusiveBetween(start: number, end: number, value: number, message: string): void {
    if (!(value <= start || value >= end)) {
      throw new RangeError(message);
    }
  }

  public static inclusiveBetween(start: number, end: number, value: number, message: string): void {
    if (!(value < start || value > end)) {
      throw new RangeError(message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isNull(value: any, message: string): void {
    if (!(value !== null)) {
      throw new Error(message);
    }
  }

  public static isTrue(expression: boolean, message: string): void {
    if (expression) {
      throw new Error(message);
    }
  }
}
