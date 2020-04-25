import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { memoryReducer, MemoryState } from '@app/memory/store/memory.reducer';

export interface AppState {
  memory: MemoryState; //
}

export const reducers: ActionReducerMap<AppState> = {
  memory: memoryReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
