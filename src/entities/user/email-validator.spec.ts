import { Email } from './email';

describe('Email validator', () => {
  const emailStub = 'diego@gmail.com';
  test('should accept valid email (valid classes)', () => {
    expect(Email.validate(emailStub)).toBe(true);
  });

  test('should not accept email without the at-sign (2)', () => {
    expect(Email.validate('diego.com')).toBe(false);
  });
});
