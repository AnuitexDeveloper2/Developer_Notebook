import { Action } from "redux";

export interface GetTopicsAction extends Action<"GET_TOPICS"> { result: any}


export type AuthActions = GetTopicsAction