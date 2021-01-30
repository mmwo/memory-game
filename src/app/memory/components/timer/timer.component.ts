import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, NEVER, Observable, Subject } from 'rxjs';
import { map, scan, share, startWith, switchMap } from 'rxjs/operators';

class TimerState {
  value?: number;
  count: boolean;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  tick$: Observable<number>;
  currentTick: number;
  private ticker$: Subject<TimerState>;

  constructor() {
    this.ticker$ = new Subject();
    this.tick$ = this.ticker$.asObservable().pipe(
      startWith({ count: false, value: 0 }),
      scan((state: TimerState, update) => ({ ...state, ...update })),
      switchMap((state) => {
        return state.count
          ? interval(1000).pipe(
              map(() => {
                return (this.currentTick = state.value++);
              })
            )
          : NEVER;
      }),
      share()
    );
  }

  ngOnInit() {}

  start() {
    this.ticker$.next({ count: true });
  }

  pause() {
    this.ticker$.next({ count: false });
  }

  stop() {
    this.ticker$.next({ count: false, value: 0 });
  }

  ngOnDestroy() {
    this.stop();
  }
}
