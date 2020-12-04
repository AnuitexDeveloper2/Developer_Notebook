import { Reducer } from "redux";
import { HeaderActions } from "../actions/header/types";


export interface HeaderState {
    readonly isOpen: boolean
    readonly openLogin: boolean
   }
   
  
const initialState: HeaderState = {
    isOpen: false,
    openLogin: false
}

const neverReached = (never: never) => {};

export const headerReducer: Reducer<HeaderState, HeaderActions> = (state=initialState, action) => {
    switch (action.type) {
        case "OpenLogin":
            return {...state, openLogin: true }
        case "CloseLogin":
            return {...state, openLogin: false}
        default:
            neverReached(action)
    }
    return state
}