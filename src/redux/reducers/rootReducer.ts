import { combineReducers } from 'redux';
import { headerReducer, HeaderState } from './headerReducer';
import { AuthState, userReducer } from './userReducer';

export interface AppState {
  readonly headerManager: HeaderState;
  readonly auth: AuthState
}

export const rootReducer = combineReducers<AppState>({
  headerManager: headerReducer,
  auth: userReducer
});
