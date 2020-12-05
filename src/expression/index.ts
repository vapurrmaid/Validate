/**
 * @fileoverview The Expression module contains useful expression utilities
 * and wrappers around primitive operations. It was created so that the module
 * Validate would have less logical duplication and concern itself more with
 * providing access to these operations from a public interface geared towards
 * validation and errors. However, this module is perfectly suitable for use
 * on its own, but may be less useful than other libraries. The core value
 * offered by this package at large is the Validate module.
 */

/**
 * NumberInterval represents a mathematical interval, ie: `(start, end)`.
 */
interface NumberInterval {
  /** Start of the interval (inclusive) */
  start: number;
  /** End of the interval (inclusive) */
  end: number;
}

/**
 * Returns `true` if the provided number is within the given interval excluding
 * the provided bounds.
 * @example
 * ```ts
 * exclusiveBetween({ 3, 5 }, 4) //-> true
 * exclusiveBetween({ 3, 5 }, 5) //-> false
 * ```
 */
export const exclusiveBetween = ({ start, end }: NumberInterval, n: number): boolean => {
  return n > start && n < end;
};

/**
 * Returns `true` if the provided number is within the given interval including
 * the provided bounds.
 * @example
 * ```ts
 * inclusiveBetween({ 3, 5 }, 2) //-> false
 * inclusiveBetween({ 3, 5 }, 3) //-> true
 * ```
 */
export const inclusiveBetween = ({ start, end }: NumberInterval, n: number): boolean => {
  return n >= start && n <= end;
};

/**
 * Returns `true` if the provided value is _not_ `undefined`.
 * @example
 * ```ts
 * isDefined(undefined) //-> false
 * isDefined(null) //-> true
 * ```
 */
export const isDefined = (value: unknown): boolean => {
  return typeof value !== "undefined";
};

/**
 * Returns `true` if the provided value is greater than or equal to the
 * provided number.
 * @example
 * ```ts
 * isEqualOrGreaterThan(3, 2) //-> true
 * ```
 */
export const isEqualOrGreaterThan = (value: number, n: number): boolean => {
  return n >= value;
};

/**
 * Returns `true` if the provided value is less than or equal to the
 * provided number.
 * @example
 * ```ts
 * isEqualOrLessThan(3, 2) //-> false
 * ```
 */
export const isEqualOrLessThan = (value: number, n: number): boolean => {
  return n <= value;
};

/**
 * Returns `true` if the provided value is stricly greater than the the
 * provided number.
 * @example
 * ```ts
 * isGreaterThan(3, 2) //-> true
 * ```
 */
export const isGreaterThan = (value: number, n: number): boolean => {
  return n > value;
};

/**
 * Returns `true` if the provided value is stricly less than the the
 * provided number.
 * @example
 * ```ts
 * isLessThan(3, 2) //-> false
 * ```
 */
export const isLessThan = (value: number, n: number): boolean => {
  return n < value;
};

/**
 * Returns `true` if the provided value is exactly `null`.
 * @example
 * isNull(null) //-> true
 * isNull(undefined) //->false
 */
export const isNull = (value: unknown): boolean => {
  return value === null;
};

/**
 * Returns `true` if the provided value is `null` or `undefined`
 * @example
 * ```ts
 * isNullish(null) //-> true
 * isNullish(undefined) //-> true
 * isNullish("") //-> false
 * ```
 */
export const isNullish = (value: unknown): boolean => {
  return value === null || typeof value === "undefined";
};

/**
 * Returns `true` if the provided expression evaluates to exactly `true`
 * @example
 * ```ts
 * isTrue(1 + 1 === 2) //-> true
 * ```
 */
export const isTrue = (expression: boolean): boolean => {
  return expression;
};
