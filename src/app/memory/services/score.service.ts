import { Injectable } from '@angular/core';
import { CardModel, MemoryGame } from '@app/memory/models';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  constructor() {}

  calc(game: MemoryGame): number {
    const cardTotalAmount = game.cards.length;
    const groupedCards = this.reduceGroupCount(game.cards);
    return groupedCards.reduce((score: number, groupdCounter: number) => {
      const groupPoints = Math.floor((cardTotalAmount / (2 ** groupdCounter + game.playedTime / 10)) * 100);
      return score + groupPoints;
    }, 0);
  }

  private reduceGroupCount(cards: CardModel[]): number[] {
    const groupedCards: { [key: string]: CardModel[] } = {};
    cards.forEach(card =>
      groupedCards[card.groupId] ? groupedCards[card.groupId].push(card) : (groupedCards[card.groupId] = [card])
    );

    return Object.values(groupedCards).map(group => {
      const groupCounter = group.reduce((counter: number, card: CardModel) => counter + card.revealCounter, 0);
      return Math.floor(groupCounter / group.length);
    });
  }
}
