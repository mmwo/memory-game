import { Injectable } from '@angular/core';
import { CardModel, MemoryGame, UniqueId } from '@app/memory/models';

@Injectable({
  providedIn: 'root',
})
export class BoardBuilderService {
  constructor() {}

  build(cards: string[]): MemoryGame {
    const builder = (card: string) => {
      const groupId = UniqueId();
      return [new CardModel(card, groupId), new CardModel(card, groupId)];
    };

    return new MemoryGame(UniqueId(), cards.map(builder).flat().shuffle());
  }
}
