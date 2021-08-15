import { combineReducers } from 'redux';
import { headerReducer, HeaderState } from './headerReducer';
import { AuthState, userReducer } from './userReducer';
import { ContentState,contentReducer } from "./contentReducer";

export interface AppState {
  readonly headerManager: HeaderState;
  readonly auth: AuthState,
  readonly content: ContentState
}

export const rootReducer = combineReducers<AppState>({
  headerManager: headerReducer,
  auth: userReducer,
  content: contentReducer
});
