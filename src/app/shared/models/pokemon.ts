export class Pokemon {
  id: number;
  name: string;
  types: PokeType[];
  sprite: Sprite;

  constructor(id: number, name: string, types: any[], sprite: Sprite) {
    this.id = id;
    this.name = name;
    this.types = types.map((t) => new PokeType(t.type.name));
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
