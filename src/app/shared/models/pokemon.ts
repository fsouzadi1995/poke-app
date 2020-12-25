export class Pokemon {
  name: string;
  types: string[];
  height: number;
  spriteUri: string | null;

  constructor(
    name: string,
    types: string[],
    height: number,
    spriteUri: string
  ) {
    this.name = name;
    this.types = types;
    this.height = height;
    this.spriteUri = spriteUri;
  }
}
