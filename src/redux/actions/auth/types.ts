import { Action } from "redux";

export interface LogInAction extends Action<"LOGIN"> { }

export interface RegisterAction extends Action<"Register"> { }

export type AuthActions = LogInAction | RegisterAction