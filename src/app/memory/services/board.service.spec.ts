import { BoardService } from '@app/memory/services/board.service';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppState } from '@app/app.reducers';
import { Store } from '@ngrx/store';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { TimeFormatPipe } from '@app/memory/pipes/time-format.pipe';
import { createSpyObj } from 'jest-createspyobj';
import { cardConcealed, cardRevealed, gameStarted } from '@app/memory/store/memory.actions';
import { CardModel, MemoryGame } from '@app/memory/models';
import { BoardBuilderService } from '@app/memory/services/board-builder';

describe('BoardService', () => {
  let boardService: BoardService;
  let fixtureTimer: ComponentFixture<TimerComponent>;
  let timer: TimerComponent;
  let mockedStore: any;
  let mockedBoardBuilder: any;
  const game = new MemoryGame('g1', [
    new CardModel('c1', 'g1'),
    new CardModel('c1', 'g1'),
    new CardModel('c2', 'g2'),
    new CardModel('c2', 'g2')
  ]);
  beforeEach(async(() => {
    mockedStore = createSpyObj<Store<AppState>>(Store, ['dispatch', 'select']);
    mockedBoardBuilder = createSpyObj<BoardBuilderService>(BoardBuilderService, ['build']);

    TestBed.configureTestingModule({
      declarations: [TimerComponent, TimeFormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockedBoardBuilder.build.mockReturnValueOnce(game);
    boardService = new BoardService(mockedStore, mockedBoardBuilder);

    fixtureTimer = TestBed.createComponent(TimerComponent);
    timer = fixtureTimer.componentInstance;
    fixtureTimer.detectChanges();
  });

  it('should create', () => {
    expect(timer).toBeTruthy();
  });

  it('dispatches startGame', () => {
    boardService.buildBoard(['one', 'two', 'three', 'four'], timer);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockedStore.dispatch).toHaveBeenCalledWith(gameStarted({ game }));
  });

  it('dispatches card revealed and auto concealed after 2 seconds', fakeAsync(() => {
    timer.time = 5;
    boardService.buildBoard(['one', 'two', 'three', 'four'], timer);
    boardService.revealCard(game.cards[1]);
    expect(mockedStore.dispatch.mock.calls[1][0]).toEqual(cardRevealed({ cardId: game.cards[1].id, time: timer.time }));
    tick(3000);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(3);
    expect(mockedStore.dispatch.mock.calls[2][0]).toEqual(cardConcealed({ cardId: game.cards[1].id }));
  }));

  it('should not call conceal after same group is matched', fakeAsync(() => {
    timer.time = 4;
    boardService.buildBoard(['one', 'two', 'three', 'four'], timer);
    boardService.revealCard(game.cards[0]);
    boardService.revealCard(game.cards[1]);
    tick(3000);
    expect(mockedStore.dispatch).not.toHaveBeenCalledWith(cardConcealed({ cardId: game.cards[0].id }));
    expect(mockedStore.dispatch).not.toHaveBeenCalledWith(cardConcealed({ cardId: game.cards[1].id }));
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(3);
  }));

  // tslint:disable-next-line:max-line-length
  it('conceals cards when revealing 3rd card and already 2 cards temporarily revealed without group being matched', fakeAsync(() => {
    timer.time = 2;
    boardService.buildBoard(['one', 'two', 'three', 'four'], timer);
    boardService.revealCard(game.cards[0]);
    boardService.revealCard(game.cards[2]);
    tick(1000);
    expect(mockedStore.dispatch).not.toHaveBeenCalledWith(cardConcealed({ cardId: game.cards[0].id }));
    expect(mockedStore.dispatch).not.toHaveBeenCalledWith(cardConcealed({ cardId: game.cards[1].id }));
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(3);
    boardService.revealCard(game.cards[1]);
    expect(mockedStore.dispatch.mock.calls[3][0]).toEqual(cardConcealed({ cardId: game.cards[0].id }));
    expect(mockedStore.dispatch.mock.calls[4][0]).toEqual(cardConcealed({ cardId: game.cards[2].id }));
    tick(2000);
    expect(mockedStore.dispatch.mock.calls[6][0]).toEqual(cardConcealed({ cardId: game.cards[1].id }));
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(7);
  }));
});
