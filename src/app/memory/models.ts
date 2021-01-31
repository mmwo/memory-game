export function UniqueId() {
  return (
    Math.random().toString(36).substring(2, 6) +
    '-' +
    Math.random().toString(36).substring(4, 8) +
    '-' +
    Math.random().toString(36).substring(6, 12)
  );
}

export interface Board {
  id: string;
  cards: Card[];
}

export interface Card {
  text: string;
  img: string;
}

export class CardModel {
  readonly type: 'text' | 'img';
  public revealed = false;
  public revealCounter = 0;
  public id: string;

  constructor(public value: string, public groupId: string) {
    this.id = UniqueId();
  }
}

export class TextCardModel extends CardModel {
  readonly type = 'text';

  constructor(public value: string, public groupId: string) {
    super(value, groupId);
  }
}

export class ImgCardModel extends CardModel {
  readonly type = 'img';
}

export interface Memory {
  boardId: string;
  playedTime: number;
  moves: number;
}

export interface MemoryConfig {
  size: '7x6' | '6x6' | '6x5' | '5x4' | '4x4' | '4x3' | '2x2'; // supported
  elems: number;
  type: 'text' | 'img' | 'mixed';
}

export class MemoryGame implements Memory {
  moves = 0;
  playedTime: number;

  constructor(
    public readonly boardId: string,
    public readonly cards: CardModel[],
    public readonly config: MemoryConfig
  ) {}
}
