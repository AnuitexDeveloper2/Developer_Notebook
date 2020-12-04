import { combineReducers } from 'redux';
import { headerReducer, HeaderState } from './headerReducer';

export interface AppState {
  readonly headerManager: HeaderState;
}

export const rootReducer = combineReducers<AppState>({
  headerManager: headerReducer,
});
