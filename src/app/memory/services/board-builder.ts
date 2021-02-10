import { Injectable } from '@angular/core';
import { Board, Card, ImgCardModel, MemoryConfig, MemoryGame, TextCardModel, UniqueId } from '@app/memory/models';

@Injectable({
  providedIn: 'root',
})
export class BoardBuilderService {
  constructor() {}

  build(board: Board, config: MemoryConfig): MemoryGame {
    const builder = (card: Card) => {
      const groupId = UniqueId();
      switch (config.type) {
        case 'img':
          return [new ImgCardModel(card.img, groupId), new ImgCardModel(card.img, groupId)];
        case 'text':
          return [new TextCardModel(card.text, groupId), new TextCardModel(card.text, groupId)];
        case 'mixed':
          return [new ImgCardModel(card.img, groupId), new TextCardModel(card.text, groupId)];
      }
    };
    const cards = board.cards.shuffle().slice(0, config.size.elems).map(builder).flat().shuffle();

    return new MemoryGame(board.id, cards, config, new Date().toISOString());
  }
}
