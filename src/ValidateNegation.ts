import { StaticChainableProperties } from "./interface";

export class ValidateNegation {
  static exclusiveBetween(
    start: number,
    end: number,
    value: number,
    message: string
  ): void {
    if (!(value <= start || value >= end)) {
      throw new RangeError(message);
    }
  }

  static inclusiveBetween(
    start: number,
    end: number,
    value: number,
    message: string
  ): void {
    if (!(value < start || value > end)) {
      throw new RangeError(message);
    }
  }

  static isNull(value: unknown, message: string): StaticChainableProperties {
    if (!(value !== null)) {
      throw new Error(message);
    }

    return ValidateNegationStaticChain;
  }

  static isTrue(
    expression: boolean,
    message: string
  ): StaticChainableProperties {
    if (expression) {
      throw new Error(message);
    }

    return ValidateNegationStaticChain;
  }
}

const ValidateNegationStaticChain: StaticChainableProperties = {
  isTrue: ValidateNegation.isTrue,
  isNull: ValidateNegation.isNull
};
