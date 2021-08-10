import { Reducer } from "redux";
import { AuthActions } from "../actions/auth/types";

export type UserState = {
    readonly firstName: string;
    readonly lastName: string;
    readonly role: string;
}

type TokensState = {
    readonly accessToken: string;
    readonly refreshToken: string;
}
export interface AuthState {
    user: UserState;
    tokens: TokensState
}


const initialState: AuthState = {
    user: {
        firstName: '',
        lastName: '',
        role: '',
    },
    tokens: {
        accessToken: '',
        refreshToken: ''
    }
}

const neverReached = (never: never) => { };

export const userReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER":
            return { ...state, user: action.result.user }
        case 'LOGIN':
            return { ...state, user: action.result.User }
        case "LogOut":
            return state = initialState
        default:
            neverReached(action)
    }
    return state
}