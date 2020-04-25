import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '@app/memory/services/board.service';
import { Observable } from 'rxjs';
import { CardModel } from '@app/memory/models';
import { TimerComponent } from '@app/memory/components/timer/timer.component';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  cards$: Observable<CardModel[]>;
  moves$: Observable<number>;
  isCompleted$: Observable<boolean>;

  @ViewChild('timer', { static: true }) timer: TimerComponent;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.cards$ = this.boardService.getCards();
    this.moves$ = this.boardService.getMoves();
    this.isCompleted$ = this.boardService.isGameCompleted().pipe(
      delay(1),
      tap((isCompleted: boolean) => (isCompleted === true ? this.timer.stop() : this.timer.start()))
    );

    this.boardService.buildBoard(
      ['Orange', 'Apple', 'Keyboard', 'Card', 'Mikołaj', 'Tea', 'To be', 'Chuck Norris'],
      this.timer
    );
  }

  onCardClick(card: CardModel) {
    this.boardService.revealCard(card);
  }

  playAgain($e: MouseEvent) {
    this.boardService.buildBoard(['Hippo', 'Window', 'Glass', 'Sugar', 'Book', 'Ananas', 'Car', 'Phone'], this.timer);
  }
}
