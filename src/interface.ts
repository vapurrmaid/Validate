export interface ValidatePropertiesWithNegation extends ValidateProperties {
  not(): ValidateProperties;
}

export interface ValidateProperties extends StaticChainableProperties {
  n(n: number): ChainableNumberProperties;
}

export interface StaticChainableProperties {
  isDefined(value: unknown, message: string): StaticChainableProperties;
  isNull(value: unknown, message: string): StaticChainableProperties;
  isNullish(value: unknown, message: string): StaticChainableProperties;
  isTrue(value: unknown, message: string): StaticChainableProperties;
}

export interface ChainableNumberProperties {
  exclusiveBetween(start: number, end: number, message: string): ChainableNumberProperties;
  inclusiveBetween(start: number, end: number, message: string): ChainableNumberProperties;
  is(value: number, message: string): ChainableNumberProperties;
  isEqualOrGreaterThan(value: number, message: string): ChainableNumberProperties;
  isEqualOrLessThan(value: number, message: string): ChainableNumberProperties;
  isGreaterThan(value: number, message: string): ChainableNumberProperties;
  isLessThan(value: number, message: string): ChainableNumberProperties;
}
