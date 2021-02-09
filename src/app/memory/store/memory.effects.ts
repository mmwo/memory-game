import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.reducers';
import { Actions, Effect } from '@ngrx/effects';
import { getMemoryGame, isGameCompleted } from '@app/memory/store/memory.selectors';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ScoreService } from '@app/memory/services/score.service';
import { ApiStorageService } from '@app/memory/services/api-storage.service';

@Injectable()
export class MemoryEffects {
  @Effect() gameSave$ = this.store$.select(isGameCompleted).pipe(
    filter((isCompleted) => isCompleted === true),
    withLatestFrom(this.store$.select(getMemoryGame).pipe(filter((game) => !!game))),
    switchMap(([_, game]) => {
      console.log('GAME COMPLETED!!!', game, 'Score:', this.scoreService.calc(game));
      this.storage.saveStats(game);
      return of(); // todo implementation of persistance
    })
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private scoreService: ScoreService,
    private storage: ApiStorageService
  ) {}
}
