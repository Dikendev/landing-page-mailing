import { User } from 'src/entities/user/user';

export interface UserRepository {
  findAllUsers: () => User[];
  add: (user: User) => boolean;
}
