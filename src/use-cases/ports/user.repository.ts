import { UserData } from '../../entities/user/user-data.interface';

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>;
  findUserByEmail: (email: string) => Promise<UserData>;
  add: (user: UserData) => Promise<void>;
  exists: (email: string) => Promise<boolean>;
}
