import { Email } from './email';

describe('Email validator', () => {
  const emailStub = 'diego@gmail.com';
  test('should accept valid email (valid classes)', () => {
    expect(Email.validate(emailStub)).toBe(true);
  });

  test('should not accept email without the at-sign (2)', () => {
    expect(Email.validate('diego.com')).toBe(false);
  });

  test('should not accept more than 64 chars on local part (4)', () => {
    const localPart = 'c'.repeat(100);
    const email = localPart + '@gmail.com';
    expect(Email.validate(email)).toBe(false);
  });
});
