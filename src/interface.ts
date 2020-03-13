export interface StaticChainableProperties {
  isNull(value: unknown, message: string): StaticChainableProperties;
  isTrue(value: unknown, message: string): StaticChainableProperties;
}
