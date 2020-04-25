import { memoryReducer, MemoryState } from '@app/memory/store/memory.reducer';
import * as memoryActions from './memory.actions';
import { CardModel, MemoryGame } from '@app/memory/models';

const initialState: MemoryState = {
  game: undefined,
  gameLog: [],
  totalScore: 0,
  totalPlayedTime: 0
};
const game = new MemoryGame('boardId', [new CardModel('val', 'g1'), new CardModel('val', 'g2')]);

describe('MemoryReducer on: gameStarted', () => {
  it('should set game state', () => {
    expect(memoryReducer(initialState, memoryActions.gameStarted({ game })).game).toEqual(game);
  });
});

describe('MemoryReducer on: cardRevealed', () => {
  it('should change card revealed to true', () => {
    const stateAfter = memoryReducer(
      { ...initialState, game },
      memoryActions.cardRevealed({ cardId: game.cards[0].id, time: 17 })
    );
    expect(stateAfter.game.cards[0].revealed).toBe(true);
  });
  it('should increment revealCounter on consecutive calls', () => {
    let state = { ...initialState, game };
    for (const iteration of [1, 2, 3, 4, 5]) {
      state = memoryReducer(state, memoryActions.cardRevealed({ cardId: game.cards[0].id, time: 17 }));
      expect(state.game.cards[0].revealCounter).toEqual(iteration);
    }
  });
  it('should update total game played duration', () => {
    let state = { ...initialState, game };
    for (const iteration of [1, 2, 3, 4, 5]) {
      const time = iteration ** iteration;
      state = memoryReducer(state, memoryActions.cardRevealed({ cardId: game.cards[0].id, time }));
      expect(state.game.playedTime).toEqual(time);
    }
  });
});

describe('MemoryReducer on: cardConcealed', () => {
  it('should change card revealed to false', () => {
    const revealedCard = new CardModel('val', 'g3');
    revealedCard.revealed = true;
    const state = { ...initialState, game: { ...game, cards: [revealedCard, ...game.cards] } };
    expect(state.game.cards[0].revealed).toBe(true);
    const stateAfter = memoryReducer(state, memoryActions.cardConcealed({ cardId: revealedCard.id }));
    expect(stateAfter.game.cards[0].revealed).toBe(false);
  });
});
