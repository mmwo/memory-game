import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  tick$: Observable<number>;
  time: number;
  private sub: Subscription;

  constructor() {}

  ngOnInit() {
    this.tick$ = interval(1000);
  }

  start() {
    if (this.sub) {
      return;
    }
    this.time = 0;
    this.sub = this.tick$.subscribe(() => this.time++);
  }

  stop() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
