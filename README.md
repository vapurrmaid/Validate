# Validate

An incredibly simple, zero-dependency package for writing maintainable, easy-to-read, validation
assertions. This package is highly inspired by:

- The Java package [org.apache.commons.lang3.Validate][1] and its use in the DDD community
- BDD-style assertions used in `Jest` and `chai`

Usage of `Validate` is an opinionated, stylistic preference. Other options exists - see the example
usage to get a feel for how `Validate` can improve code style.

## Example Usage

Without:

```ts
class PositiveNumber {
  public readonly value: number;

  constructor(i: number) {
    if (i <= 0) {
      throw new Error(`i must be greater than 0. Instead received ${i}`);
    }
    this.value = i;
  }
}
```

With:

```ts
import { Validate } from '@vapurrmaid/validate';

class PositiveNumber {
  public readonly value: number;

  constructor(i: number) {
    Validate.isTrue(i > 0, `i must be greater than 0. Instead received ${i}`);
    this.value = i;
  }
}
```

[1]: https://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/Validate.html
