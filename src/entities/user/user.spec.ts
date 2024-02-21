import { left, right } from '../../shared/either';
import { User } from './user';
import { InvalidNameError } from './errors/invalid-name';

describe('User domain entity', () => {
  const email = 'diego@gmail.com';
  test('should not create user with invalid name (too few characters)', async () => {
    const name = 'O';
    const userOrError = User.create({ name, email });
    expect(userOrError).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create user with invalid name (too few characters)', async () => {
    let name = '';
    for (let i = 0; i < 256; i++) {
      name += 'c';
    }
    const user = User.create({ name, email });
    expect(user).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create user with invalid name (only blank spaces)', async () => {
    const name = '    ';
    const user = User.create({ name, email });
    expect(user).toEqual(left(new InvalidNameError(name)));
  });

  test('should create user with valid name', async () => {
    const name = 'Diego Kennedy';
    const user = User.create({ name, email });
    expect(user).toEqual(right(user).value);
  });
});
