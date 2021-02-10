import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '@app/memory/services/board.service';
import { Observable } from 'rxjs';
import { Board, CardModel, MemoryConfig } from '@app/memory/models';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { delay, tap } from 'rxjs/operators';
import { ApiStorageService } from '@app/memory/services/api-storage.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  cards$: Observable<CardModel[]>;
  moves$: Observable<number>;
  isCompleted$: Observable<boolean>;

  @ViewChild('timer', { static: true }) timer: TimerComponent;
  public sizes: { className: string; elems: number }[] = [
    { className: '2x2', elems: 2 },
    { className: '4x3', elems: 6 },
    { className: '4x4', elems: 8 },
    { className: '5x4', elems: 10 },
    { className: '6x5', elems: 15 },
    { className: '6x6', elems: 18 },
    { className: '7x6', elems: 21 },
  ];
  public types: string[] = ['mixed', 'text', 'img'];

  public form = this.fb.group({
    size: [this.sizes[2], Validators.required],
    type: [this.types[2], Validators.required],
  });

  private board: Board;

  constructor(private boardService: BoardService, private storage: ApiStorageService, private fb: FormBuilder) {
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
  }

  onCardClick(card: CardModel) {
    this.boardService.revealCard(card);
  }

  play($e: MouseEvent) {
    this.boardService.buildBoard(this.board, this.timer, this.form.value);
  }

  ngOnDestroy() {
    this.boardService.giveUp();
  }
}
