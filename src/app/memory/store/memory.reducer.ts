import { createReducer, on } from '@ngrx/store';
import * as memoryActions from './memory.actions';
import { CardModel, Memory, MemoryGame } from '@app/memory/models';

export interface MemoryState {
  game: MemoryGame;
  gameLog: Memory[];
  totalScore: number;
  totalPlayedTime: number;
}

const initialState: MemoryState = {
  game: undefined,
  gameLog: [],
  totalScore: 0,
  totalPlayedTime: 0
};

export const memoryReducer = createReducer<MemoryState>(
  initialState,
  on(memoryActions.gameStarted, (state, { game }) => {
    return { ...state, game };
  }),
  on(memoryActions.cardRevealed, (state, { cardId, time }) => {
    const cards = setRevealedStatus(state.game.cards, cardId, true);
    return { ...state, game: { ...state.game, cards, moves: state.game.moves + 1, playedTime: time } };
  }),
  on(memoryActions.cardConcealed, (state, { cardId }) => {
    const cards = setRevealedStatus(state.game.cards, cardId, false);
    return { ...state, game: { ...state.game, cards } };
  })
);

function setRevealedStatus(cards: CardModel[], cardId: string, revealed: boolean): CardModel[] {
  const i = cards.findIndex(card => card.id === cardId);
  const revealCounter = revealed ? cards[i].revealCounter + 1 : cards[i].revealCounter;
  const newCard = { ...cards[i], revealed, revealCounter };
  return [...cards.slice(0, i), newCard, ...cards.slice(i + 1)];
}
