export function UniqueId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 6) +
    '-' +
    Math.random()
      .toString(36)
      .substring(4, 8) +
    '-' +
    Math.random()
      .toString(36)
      .substring(6, 12)
  );
}

export class CardModel {
  public revealed = false;
  public revealCounter = 0;
  public id: string;

  constructor(public value: string, public groupId: string) {
    this.id = UniqueId();
  }
}

export interface Memory {
  boardId: string;
  playedTime: number;
  moves: number;
}

export class MemoryGame implements Memory {
  moves = 0;
  playedTime: number;

  constructor(public boardId: string, public cards: CardModel[]) {}
}
