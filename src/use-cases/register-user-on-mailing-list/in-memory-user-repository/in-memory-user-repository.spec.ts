import { UserData } from 'entities/user/user-data.interface';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('In memory User repository', () => {
  const emailStub = 'any_email@gmail.com';
  const nameStub = 'any_name';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should repository to be defined', () => {
    const userRepo = new InMemoryUserRepository();
    expect(userRepo).toBeDefined();
  });

  test('should return user if user is found', async () => {
    const users: UserData[] = [{ name: nameStub, email: emailStub }];
    const userRepo = new InMemoryUserRepository(users);
    const user = await userRepo.findUserByEmail(emailStub);
    expect(user.name).toEqual(nameStub);
    expect(user.email).toEqual(emailStub);
  });

  test('should return null if user is not found', async () => {
    const userRepo = new InMemoryUserRepository();
    const user = await userRepo.findUserByEmail(emailStub);
    expect(user).toEqual(null);
  });

  test('should add user', async () => {
    const userRepo = new InMemoryUserRepository();
    await userRepo.add({ name: nameStub, email: emailStub });
    const user = await userRepo.findUserByEmail(emailStub);
    expect(user.email).toEqual('any_email@gmail.com');
  });

  test('should not add if user already exist', async () => {
    const userRepo = new InMemoryUserRepository([
      { name: nameStub, email: emailStub },
    ]);

    const userAttemptAdd = await userRepo.add({
      name: nameStub,
      email: emailStub,
    });

    expect(userAttemptAdd).toEqual(undefined);
  });
});
