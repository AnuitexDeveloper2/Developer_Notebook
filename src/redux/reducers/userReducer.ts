import { Reducer } from "redux";
import { AuthActions } from "../actions/auth/types";

export interface UserState {
    readonly firstName: string;
    readonly lastName: string;
    readonly token: string;
    readonly role: string;
   }
   
  
const initialState: UserState = {
    firstName: '',
    lastName: '',
    role: '',
    token: ''
}

const neverReached = (never: never) => {};

export const userReducer: Reducer<UserState, AuthActions> = (state=initialState, action) => {
    switch (action.type) {
        case "REGISTER":
            return {...state, firstName: action.result.firstName, lastName: action.result.lastName, email: action.result.email, token: action.result.token }
        case 'LOGIN':
            return {...state, firstName: action.result.firstName, lastName: action.result.lastName, email: action.result.email }
        default:
            neverReached(action)
    }
    return state
}