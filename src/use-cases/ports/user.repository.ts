import { UserData } from '../../entities/user/user-data.interface';

export abstract class UserRepository {
  abstract findAllUsers: () => Promise<UserData[]>;
  abstract findUserByEmail: (email: string) => Promise<UserData>;
  abstract add: (user: UserData) => Promise<void>;
  abstract exists: (email: string) => Promise<boolean>;
}
