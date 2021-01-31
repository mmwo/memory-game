import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Card, CardModel, MemoryConfig } from '@app/memory/models';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.reducers';
import * as memoryActions from '@app/memory/store/memory.actions';
import * as fromMemory from '@app/memory/store/memory.selectors';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { BoardBuilderService } from '@app/memory/services/board-builder';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private revealed: string[] = [];
  private groupId: string;
  private timeout: any;
  private timer: TimerComponent;

  constructor(private store: Store<AppState>, private boardBuilder: BoardBuilderService) {}

  getCards(): Observable<CardModel[]> {
    return this.store.select(fromMemory.getCards);
  }

  getMoves(): Observable<number> {
    return this.store.select(fromMemory.getMoves);
  }

  isGameCompleted(): Observable<boolean> {
    return this.store.select(fromMemory.isGameCompleted);
  }

  buildBoard(board: Board, timer: TimerComponent, config: MemoryConfig): void {
    this.timer = timer;
    this.resetData();
    const game = this.boardBuilder.build(board, config);

    this.store.dispatch(memoryActions.gameStarted({ game }));
  }

  revealCard(card: CardModel): void {
    if (this.revealed.length === 2) {
      clearTimeout(this.timeout);
      this.revertTemporary();
    }
    this.store.dispatch(memoryActions.cardRevealed({ cardId: card.id, time: this.timer.currentTick }));
    this.revealed.push(card.id);

    if (this.groupId === card.groupId) {
      clearTimeout(this.timeout);
      this.resetData();
      return;
    }
    this.groupId = card.groupId;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.revertTemporary.bind(this), 2000);
  }

  private revertTemporary(): void {
    this.revealed.forEach((cardId) => this.store.dispatch(memoryActions.cardConcealed({ cardId })));
    this.resetData();
  }

  private resetData(): void {
    this.groupId = '';
    this.revealed = [];
    this.timeout = null;
  }
}
