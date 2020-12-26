export class Pokemon {
  name: string;
  types: PokeType[];
  height: number;
  sprite: Sprite;

  constructor(name: string, types: any[], height: number, sprite: Sprite) {
    this.name = name;
    this.types = types.map((t) => new PokeType(t.type.name));
    this.height = height;
    this.sprite = sprite;
  }
}

function getEmoji(type: string) {
  switch (type.toLowerCase().trim()) {
    case 'normal':
      return '🔰';
    case 'fire':
      return '🔥';
    case 'water':
      return '💧';
    case 'grass':
      return '🌱';
    case 'electric':
      return '⚡';
    case 'ice':
      return '❄️';
    case 'fighting':
      return '💪🏻';
    case 'poison':
      return '💀';
    case 'ground':
      return '⛰️';
    case 'flying':
      return '🦋';
    case 'psychic':
      return '🧠';
    case 'bug':
      return '🐞';
    case 'rock':
      return '🗿';
    case 'ghost':
      return '👻';
    case 'dark':
      return '🌚';
    case 'dragon':
      return '🐲';
    case 'steel':
      return '⛓';
    case 'fairy':
      return '🧚🏻‍♀️';
    default:
      return 'not found';
  }
}

export interface Sprite {
  back_default: string | null;
  front_default: string | null;
}

export class PokeType {
  name: string;
  emoji: string | undefined;

  constructor(name: string) {
    this.name = name;
    this.emoji = getEmoji(name);
  }
}
