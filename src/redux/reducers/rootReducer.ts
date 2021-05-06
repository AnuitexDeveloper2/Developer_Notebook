import { combineReducers } from 'redux';
import { headerReducer, HeaderState } from './headerReducer';
import { userReducer, UserState } from './userReducer';

export interface AppState {
  readonly headerManager: HeaderState;
  readonly user: UserState
}

export const rootReducer = combineReducers<AppState>({
  headerManager: headerReducer,
  user: userReducer
});
