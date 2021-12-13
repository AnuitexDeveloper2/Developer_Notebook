import { combineReducers } from 'redux';
import { headerReducer, HeaderState } from './headerReducer';
import { AuthState, userReducer } from './userReducer';
import { ContentState,contentReducer } from "./contentReducer";
import { AppointmentState } from '../../types/states';
import { appointmentReducer } from './appointmentReducer';

export interface AppState {
  readonly headerManager: HeaderState;
  readonly auth: AuthState,
  readonly content: ContentState,
  readonly appointment: AppointmentState
}

export const rootReducer = combineReducers<AppState>({
  headerManager: headerReducer,
  auth: userReducer,
  content: contentReducer,
  appointment: appointmentReducer
});
