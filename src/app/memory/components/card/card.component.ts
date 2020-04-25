import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModel } from '@app/memory/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  revealed: boolean;
  show: boolean;
  hide: boolean;

  @Input() card: CardModel;
  @Output() clicked = new EventEmitter<CardModel>();

  constructor() {}

  ngOnInit() {
    if (!this.card) {
      return;
    }
    if (this.card.revealed) {
      this.animateShow();
    } else {
      this.animateHide();
    }
  }

  onClick() {
    if (this.card.revealed) {
      return;
    }
    this.clicked.emit(this.card);
  }

  private animateShow() {
    this.show = true;
    setTimeout(() => (this.revealed = true), 350);
    setTimeout(() => (this.show = false), 700);
  }

  private animateHide() {
    this.revealed = true;
    this.hide = true;
    setTimeout(() => (this.revealed = false), 350);
    setTimeout(() => (this.hide = false), 700);
  }
}
