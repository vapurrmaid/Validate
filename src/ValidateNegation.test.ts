import { ValidateNegation } from './ValidateNegation';

describe('ValidateNegation', () => {
  describe('ValidateNegation.inclusiveBetween', () => {
    it('does not throw if the value is out of bounds', () => {
      function shouldNotThrow(): void {
        ValidateNegation.inclusiveBetween(0, 1, 2, 'test');
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it('throws with the provided message if the value is on the lower bound', () => {
      function shouldNotThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 0, 'test');
      }
      expect(shouldNotThrow).toThrowError('test');
    });

    it('throws with the provided message if the value is on the upper bound', () => {
      function shouldNotThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 10, 'test');
      }
      expect(shouldNotThrow).toThrowError('test');
    });

    it('throws with the provided message if the value is within bounds', () => {
      function shouldThrow(): void {
        ValidateNegation.inclusiveBetween(0, 10, 5, 'test');
      }
      expect(shouldThrow).toThrowError('test');
    });
  });

  describe('ValidateNegation.isTrue', () => {
    it('does not throw for false expressions', () => {
      function shouldNotThrow(): void {
        ValidateNegation.isTrue(false, 'test');
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it('throws with the provided message for true expressions', () => {
      function shouldThrow(): void {
        ValidateNegation.isTrue(true, 'test');
      }
      expect(shouldThrow).toThrowError('test');
    });
  });
});
