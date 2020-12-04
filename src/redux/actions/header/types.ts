import { Action } from "redux";

export interface CloseLogin extends Action<"CloseLogin">{}

export interface OpenLogIn extends Action<"OpenLogin">{}

export type HeaderActions = CloseLogin| OpenLogIn