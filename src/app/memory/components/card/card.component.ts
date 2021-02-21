import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CardModel } from '@app/memory/models';
import { LocalStateService } from '@shared/services/local-state-service';

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
  @Input() animate: boolean | 1 | 0 | '1' | '0' = true;
  @Input() card: CardModel;
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
      // tslint:disable-next-line:triple-equals
      if (card.revealed === true && this.animate == 1) {
        this.animateShow();
        // tslint:disable-next-line:triple-equals
      } else if (!changes.card.firstChange && this.animate == 1) {
        this.animateHide();
        // tslint:disable-next-line:triple-equals
      } else if (this.animate == 0) {
        // console.log('this.card', this.card);
        this.localState.setState({ revealed: this.card ? this.card.revealed : false });
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
