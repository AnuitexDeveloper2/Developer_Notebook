import { Reducer } from "redux";
import { AuthActions } from "../actions/auth/types";

export interface UserState {
    readonly firstName: string;
    readonly lastName: string;
    readonly role: string;
   }
   
  
const initialState: UserState = {
    firstName: '',
    lastName: '',
    role: ''
}

const neverReached = (never: never) => {};

export const userReducer: Reducer<UserState, AuthActions> = (state=initialState, action) => {
    debugger
    switch (action.type) {
        case "Register":
            return {...state, firstName: action.result.firstName, lastName: action.result.lastName, email: action.result.email }
        case 'LOGIN':
            return {...state/*, firstName: action.result.firstName, lastName: action.result.lastName, email: action.result.email */}
        default:
            neverReached(action)
    }
    return state
}