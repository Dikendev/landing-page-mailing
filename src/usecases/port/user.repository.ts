import { User } from 'src/entities/user';

export interface UserRepository {
  findAllUsers: () => User[];
  add: (user: User) => boolean;
}
