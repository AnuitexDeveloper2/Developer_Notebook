import { Action } from "redux";

export interface CloseLogin extends Action<"CloseLogin"> { }

export interface OpenLogIn extends Action<"OpenLogin"> { }

export interface OpenRegister extends Action<"OpenRegister"> { }

export interface CloseRegister extends Action<"CloseRegister"> { }

export type HeaderActions = CloseLogin | OpenLogIn | OpenRegister | CloseRegister