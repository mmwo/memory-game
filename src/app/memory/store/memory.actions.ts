import { createAction, props } from '@ngrx/store';
import { MemoryGame } from '@app/memory/models';

export const gameStarted = createAction('[BoardService] Game Started', props<{ game: MemoryGame }>());
export const cardRevealed = createAction('[BoardService] Card Revealed', props<{ cardId: string; time: number }>());
export const cardConcealed = createAction('[BoardService] Card Concealed', props<{ cardId: string }>());
