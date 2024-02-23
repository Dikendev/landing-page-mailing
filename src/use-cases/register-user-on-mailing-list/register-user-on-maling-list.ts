import { UserData } from '../../entities/user/user-data.interface';
import { RegisterUser } from './register-user.interface';
import { RegisterUserResponse } from './register-user-response.interface';
import { UserRepository } from '../ports/user.repository';
import { Either, left, right } from '../../shared/either';
import { InvalidNameError } from '../../entities/user/errors/invalid-name';
import { InvalidEmailError } from '../../entities/user/errors/invalid-email';
import { User } from '../../entities/user/user';

export class registerUserOnMailingList implements RegisterUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUserOnMailingList(
    userData: UserData,
  ): Promise<RegisterUserResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;

    const exists = await this.userRepository.exists(user.email.value);

    if (!exists.valueOf()) {
      await this.userRepository.add({
        name: user.name.value,
        email: user.email.value,
      });
    }

    return right(userData);
  }
}
