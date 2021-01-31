import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '@app/memory/services/board.service';
import { Observable } from 'rxjs';
import { Board, CardModel, MemoryConfig } from '@app/memory/models';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { delay, tap } from 'rxjs/operators';
import { StorageService } from '@app/memory/services/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  cards$: Observable<CardModel[]>;
  moves$: Observable<number>;
  isCompleted$: Observable<boolean>;

  @ViewChild('timer', { static: true }) timer: TimerComponent;
  public sizes: MemoryConfig[] = [
    { size: '7x6', elems: 21, type: 'mixed' }, // 0
    { size: '6x6', elems: 18, type: 'text' }, // 1
    { size: '6x5', elems: 15, type: 'img' }, // 2
    { size: '5x4', elems: 10, type: 'text' }, // 3
    { size: '4x4', elems: 8, type: 'mixed' }, // 4
    { size: '4x3', elems: 6, type: 'img' }, // 5
    { size: '2x2', elems: 2, type: 'img' }, // 6
  ];
  public selectedCfg = this.sizes[6];

  private board: Board;

  constructor(private boardService: BoardService, private storage: StorageService) {
    this.board = this.storage.fetchBoard('asdf');
  }

  trackByFn = (card: CardModel) => card.id;

  ngOnInit() {
    this.cards$ = this.boardService.getCards();
    this.moves$ = this.boardService.getMoves();
    this.isCompleted$ = this.boardService.isGameCompleted().pipe(
      delay(1),
      tap((isCompleted: boolean) => (isCompleted === true ? this.timer.stop() : this.timer.start()))
    );

    this.boardService.buildBoard(this.board, this.timer, this.selectedCfg);
  }

  onCardClick(card: CardModel) {
    this.boardService.revealCard(card);
  }

  playAgain($e: MouseEvent) {
    this.boardService.buildBoard(this.board, this.timer, this.selectedCfg);
  }
}
