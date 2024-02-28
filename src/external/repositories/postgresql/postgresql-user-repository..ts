import { UserData } from '../../../entities/user/user-data.interface';
import { UserRepository } from '../../../use-cases/ports/user.repository';

export class PostgresqlRepository implements UserRepository {
  findAllUsers: () => Promise<UserData[]>;
  findUserByEmail: (email: string) => Promise<UserData>;
  add: (user: UserData) => Promise<void>;
  exists: (email: string) => Promise<boolean>;
}
