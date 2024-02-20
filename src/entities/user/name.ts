export class Name {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
    Object.freeze(this);
  }

  get value(): string {
    return this.name;
  }
}
