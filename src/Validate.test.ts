import { Validate } from './Validate';

describe('Validate', () => {
  describe('Validate.isTrue', () => {
    it('does not throw for true expressions', () => {
      function shouldNotThrow(): void {
        Validate.isTrue(true, 'test');
      }
      expect(shouldNotThrow).not.toThrowError();
    });

    it('throws with the provided message for false expressions', () => {
      function shouldThrow(): void {
        Validate.isTrue(false, 'test');
      }
      expect(shouldThrow).toThrowError('test');
    });
  });
});
