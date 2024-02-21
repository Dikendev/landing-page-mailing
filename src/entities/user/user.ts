import { Either, left, right } from '../../shared/either';
import { Name } from './name';
import { InvalidNameError } from './errors/invalid-name';
import { UserData } from './user-data';

export class User {
  public readonly name: Name;

  private constructor(name: Name) {
    this.name = name;
    Object.freeze(this);
  }

  static create(userData: UserData): Either<InvalidNameError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(
      userData.name,
    );

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const name: Name = nameOrError.value;
    return right(new User(name));
  }
}
