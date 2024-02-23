import { UserData } from '../../../entities/user/user-data.interface';
import { UserRepository } from '../../ports/user.repository';

export class InMemoryUserRepository implements UserRepository {
  users: UserData[] = [];

  constructor(users: UserData[] = []) {
    this.users = users;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users;
  }

  async findUserByEmail(email: string): Promise<UserData> {
    let user: UserData;
    for (user of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async exists(email: string) {
    const user = await this.findUserByEmail(email);
    if (user === null) {
      return false;
    }
    return true;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user.email);
    if (!exists) {
      this.users.push(user);
    }
  }
}
