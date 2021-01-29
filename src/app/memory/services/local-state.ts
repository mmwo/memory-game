import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export class LocalState<T> {
  public value$: Observable<T>;
  private _state: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
    this.value$ = this._state.asObservable();
  }

  setState(params: Partial<T>, timeout: number = 0): void {
    setTimeout(
      () =>
        this._state.next({
          ...this._state.value,
          ...params,
        }),
      timeout
    );
  }
}
