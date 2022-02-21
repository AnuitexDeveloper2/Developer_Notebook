import { Reducer } from 'redux';
import { HeaderActions } from '../actions/header/types';

export interface HeaderState {
  readonly openLogin: boolean;
  readonly openRegister: boolean;
  readonly openError: string;
}

const initialState: HeaderState = {
  openLogin: false,
  openRegister: false,
  openError: ""
};

const neverReached = (never: never) => {};

export const headerReducer: Reducer<HeaderState, HeaderActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'OpenLogin':
      return { ...state, openLogin: true };
    case 'CloseLogin':
      return { ...state, openLogin: false };
    case 'OpenRegister':
      return { ...state, openRegister: true };
    case 'CloseRegister':
      return { ...state, openRegister: false };
    case 'CloseError':
      return { ...state, openError: "" };
    case 'OpenError':
      return { ...state, openError: action.error };
    default:
      neverReached(action);
  }
  return state;
};
