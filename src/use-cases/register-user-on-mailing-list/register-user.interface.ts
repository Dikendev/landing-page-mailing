import { UserData } from '../../entities/user/user-data.interface';
import { RegisterUserResponse } from './register-user-response.interface';

export interface RegisterUser {
  registerUserOnMailingList: (user: UserData) => Promise<RegisterUserResponse>;
}
