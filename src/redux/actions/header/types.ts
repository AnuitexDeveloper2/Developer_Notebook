import { Action } from 'redux';

export interface CloseLogin extends Action<'CloseLogin'> {}

export interface OpenLogIn extends Action<'OpenLogin'> {}

export interface OpenRegister extends Action<'OpenRegister'> {}

export interface CloseRegister extends Action<'CloseRegister'> {}

export interface OpenError extends Action<'OpenError'> {
  error: string;
}

export interface CloseError extends Action<'CloseError'> {}

export type HeaderActions =
  | CloseLogin
  | OpenLogIn
  | OpenRegister
  | CloseRegister
  | OpenError
  | CloseError;
