import { MemoryState } from '@app/memory/store/memory.reducer';
import { CardModel, MemoryGame } from '@app/memory/models';
import { getCards, getMemoryGame, getMoves, isGameCompleted } from '@app/memory/store/memory.selectors';

const mockedCards: CardModel[] = [
  new CardModel('v1', 'g1'),
  new CardModel('v1', 'g1'),
  new CardModel('v2', 'g2'),
  new CardModel('v2', 'g2'),
];

const mockMemoryState: MemoryState = {
  game: new MemoryGame('boardId', mockedCards),
  totalPlayedTime: 0,
  totalScore: 0,
  gameLog: [],
};

describe('MemorySelectors: getMemoryGame', () => {
  it('should return game from state', () => {
    expect(getMemoryGame({ memory: mockMemoryState })).toEqual(mockMemoryState.game);
  });

  it('should return undefined for not yet started game', () => {
    expect(getMemoryGame({ memory: { ...mockMemoryState, game: undefined } })).toBeUndefined();
  });
});

describe('MemorySelectors: getCards', () => {
  it('should return cards from game', () => {
    expect(getCards.projector(mockMemoryState.game)).toEqual(mockedCards);
  });

  it('should return undefined for not yet started game', () => {
    expect(getCards.projector(undefined)).toBeUndefined();
  });
});

describe('MemorySelectors: getMoves', () => {
  it('should return cards from game', () => {
    expect(getMoves.projector(mockMemoryState.game)).toEqual(0);
    expect(getMoves.projector({ ...mockMemoryState.game, moves: 7 })).toEqual(7);
  });

  it('should return undefined for not yet started game', () => {
    expect(getMoves.projector(undefined)).toBeUndefined();
  });
});

describe('MemorySelectors: isGameCompleted', () => {
  it('should return isCompleted to be false', () => {
    expect(isGameCompleted.projector(mockedCards)).toBe(false);
  });

  it('should return true for all cards revealed', () => {
    const revealedCardsMock = mockedCards.map((card) => ({ ...card, revealed: true }));
    expect(isGameCompleted.projector(revealedCardsMock)).toBe(true);
  });

  it('should not return true if not all cards revealed', () => {
    const revealedCard = new CardModel('some', 'group');
    revealedCard.revealed = true;
    const someCardsRevealedMock = [...mockedCards, revealedCard, revealedCard];
    expect(isGameCompleted.projector(someCardsRevealedMock)).toBe(false);
  });

  it('should return undefined for undefined input', () => {
    expect(isGameCompleted.projector(undefined)).toBeUndefined();
  });
});
