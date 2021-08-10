import { Action } from "redux";

export interface LogInAction extends Action<"LOGIN"> { result: any}

export interface RegisterAction extends Action<"REGISTER"> {
    result: any
 }

 export interface LogOut extends Action<"LogOut"> { }

export type AuthActions = LogInAction | RegisterAction | LogOut