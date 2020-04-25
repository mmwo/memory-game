import { AppState } from '@app/app.reducers';
import { createSelector } from '@ngrx/store';
import { MemoryGame } from '@app/memory/models';

export const getMemoryGame = (state: AppState) => state.memory.game;
export const getCards = createSelector(getMemoryGame, (game: MemoryGame) => (game ? game.cards : undefined));
export const getMoves = createSelector(getMemoryGame, (game: MemoryGame) => (game ? game.moves : undefined));

export const isGameCompleted = createSelector(getCards, cards => {
  if (cards !== undefined) {
    return cards.find(c => c.revealed === false) === undefined;
  } else {
    return undefined;
  }
});
