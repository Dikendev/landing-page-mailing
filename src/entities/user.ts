import { Name } from './name';

export class User {
  public readonly name: Name;

  private constructor(name: Name) {
    this.name = name;
    Object.freeze(this);
  }
}
