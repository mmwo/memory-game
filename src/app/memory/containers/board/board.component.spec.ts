import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { BoardComponent } from './board.component';
import { BoardService } from '@app/memory/services/board.service';
import { CardComponent } from '@app/memory/components/card/card.component';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { TimeFormatPipe } from '@app/memory/pipes/time-format.pipe';
import { CommonModule } from '@angular/common';
import { createSpyObj } from 'jest-createspyobj';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { CardModel } from '@app/memory/models';
import { By } from '@angular/platform-browser';
import { SizerDirective } from '@app/memory/directives/sizer.directive';

function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  const initialCards = [
    new CardModel('val1', 'g1'),
    new CardModel('val1', 'g1'),
    new CardModel('val2', 'g1'),
    new CardModel('val2', 'g1')
  ];
  let mockedBoardService: any;
  const isGameCompleted$ = new Subject<boolean>();
  const moves$ = new Subject<number>();
  const cards$ = new Subject<CardModel[]>();

  beforeEach(async(() => {
    mockedBoardService = createSpyObj(BoardService, [
      'getCards',
      'getMoves',
      'isGameCompleted',
      'buildBoard',
      'revealCard'
    ]);
    mockedBoardService.isGameCompleted.mockReturnValue(isGameCompleted$);
    mockedBoardService.getMoves.mockReturnValue(moves$);
    mockedBoardService.getCards.mockReturnValue(cards$);
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        CommonModule,
        TranslateModule.forRoot({}),
        SharedModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule
      ],
      declarations: [BoardComponent, CardComponent, TimerComponent, TimeFormatPipe, SizerDirective],
      providers: [{ provide: BoardService, useValue: mockedBoardService }]
    }).compileComponents();

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        };
      })
    });

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have available timer', () => {
    const timer = fixture.nativeElement.querySelectorAll('app-timer');
    expect(timer).toBeTruthy();
  });
  it('should have timer ticking after game started', fakeAsync(() => {
    isGameCompleted$.next(false);
    // await setTimeoutPromise(3000);
    tick(2000);
    expect(component.timer.time).toBeGreaterThan(0);
    tick(2000);
    expect(component.timer.time).toBeGreaterThan(2);
    component.timer.stop();
  }));

  it('should buildBoard onInit', () => {
    expect(mockedBoardService.buildBoard).toHaveBeenCalledTimes(1);
  });

  it('should render four Cards', async(async () => {
    moves$.next(0);
    fixture.detectChanges();

    isGameCompleted$.next(false);
    await setTimeoutPromise(2);
    fixture.detectChanges();

    cards$.next(initialCards);
    fixture.detectChanges();

    const cardElements = fixture.nativeElement.querySelectorAll('app-card');
    expect(cardElements.length).toEqual(initialCards.length);
  }));

  it('should trigger cardRevealed when clicked on it', async(async () => {
    moves$.next(0);
    fixture.detectChanges();

    isGameCompleted$.next(false);
    await setTimeoutPromise(5);
    fixture.detectChanges();

    cards$.next(initialCards);
    fixture.detectChanges();

    const cardElements: CardComponent = fixture.debugElement.query(By.directive(CardComponent)).componentInstance;
    cardElements.onClick();
    expect(mockedBoardService.revealCard).toHaveBeenCalledTimes(1);
  }));

  it('should trigger buildBoard on Play again', async(async () => {
    moves$.next(0);
    fixture.detectChanges();
    expect(mockedBoardService.buildBoard).toHaveBeenCalledTimes(1);

    isGameCompleted$.next(true);
    await setTimeoutPromise(5);
    fixture.detectChanges();
    const playButton = fixture.nativeElement.querySelector('.board-cover button');
    playButton.click();
    fixture.detectChanges();

    expect(mockedBoardService.buildBoard).toHaveBeenCalledTimes(2);
  }));
});