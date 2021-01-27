import { Component, OnInit, ViewChild } from '@angular/core';
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
  public sizes = [
    { size: '7x6', elems: 21 },
    { size: '6x6', elems: 18 },
    { size: '6x5', elems: 15 },
    { size: '5x4', elems: 10 },
    { size: '4x4', elems: 8 },
    { size: '2x2', elems: 2 }
  ];
  public selected = this.sizes[5];

  private cardsToSelect = [
    'Orange',
    'Apple',
    'Keyboard',
    'Card',
    'Mikołaj',
    'Tea',
    'To be',
    'Chuck Norris and his low kick',
    'Banana',
    'Tomato',
    'Potato',
    'Car',
    'Bee',
    'Table',
    'Coconut',
    '8-ball',
    'Camera',
    'Glass',
    'Hippo',
    'Window',
    'Sugar',
    'Book',
    'Ananas',
    'Phone'
  ];

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.cards$ = this.boardService.getCards();
    this.moves$ = this.boardService.getMoves();
    this.isCompleted$ = this.boardService.isGameCompleted().pipe(
      delay(1),
      tap((isCompleted: boolean) => (isCompleted === true ? this.timer.stop() : this.timer.start()))
    );

    this.boardService.buildBoard(this.cardsToSelect.shuffle().splice(0, this.selected.elems), this.timer);
  }

  onCardClick(card: CardModel) {
    this.boardService.revealCard(card);
  }

  playAgain($e: MouseEvent) {
    this.boardService.buildBoard(this.cardsToSelect.shuffle().splice(0, this.selected.elems), this.timer);
  }
}
