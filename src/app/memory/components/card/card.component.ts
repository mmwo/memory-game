import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CardModel } from '@app/memory/models';
import { LocalStateService } from '@app/shared/services/local-state-service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LocalStateService,
      useFactory: () =>
        new LocalStateService<{ show: boolean; hide: boolean; revealed: boolean }>({
          show: false,
          hide: false,
          revealed: false,
        }),
    },
  ],
})
export class CardComponent implements OnChanges {
  @Input()
  card: CardModel;
  @Output() clicked = new EventEmitter<CardModel>();
  localState$ = this.localState.value$;

  constructor(public localState: LocalStateService<{ show: boolean; hide: boolean; revealed: boolean }>) {}

  onClick() {
    if (this.card.revealed) {
      return;
    }
    this.clicked.emit(this.card);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.card && changes.card.currentValue) {
      const card = changes.card.currentValue;
      if (card.revealed === true) {
        this.animateShow();
      } else if (!changes.card.firstChange) {
        this.animateHide();
      }
    }
  }

  private animateShow() {
    this.localState.setState({ show: true });
    this.localState.setState({ revealed: true }, 350);
    this.localState.setState({ show: false }, 700);
  }

  private animateHide() {
    this.localState.setState({ revealed: true });
    this.localState.setState({ hide: true });
    this.localState.setState({ revealed: false }, 350);
    this.localState.setState({ hide: false }, 700);
  }
}
