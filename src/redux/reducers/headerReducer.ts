import { Reducer } from "redux";
import { HeaderActions } from "../actions/header/types";


export interface HeaderState {
    readonly openLogin: boolean
    readonly openRegister: boolean
   }
   
  
const initialState: HeaderState = {
    openLogin: false,
    openRegister: false
}

const neverReached = (never: never) => {};

export const headerReducer: Reducer<HeaderState, HeaderActions> = (state=initialState, action) => {
    switch (action.type) {
        case "OpenLogin":
            return {...state, openLogin: true }
        case "CloseLogin":
            return {...state, openLogin: false}
        case "OpenRegister":
            return {...state, openRegister: true}
        case "CloseRegister":
            return{...state, openRegister: false}
        default:
            neverReached(action)
    }
    return state
}