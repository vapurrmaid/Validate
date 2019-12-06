import { ValidateNegation } from './ValidateNegation';

describe('ValidateNegation', () => {
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
