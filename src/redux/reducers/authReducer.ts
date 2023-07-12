import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../types/auth";
import { signInAction } from "../actions/auth/authActions";

type TokensState = {
    readonly accessToken?: string;
    readonly refreshToken?: string;
}
export interface AuthState {
    user?: UserModel;
    tokens?: TokensState
}


const initialState: AuthState = {
    user: undefined,
    tokens: {
        accessToken: '',
        refreshToken: ''
    }
}


export const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logOutAction(state) {
            state.user = undefined;
        },
    },
    extraReducers(builder) {
        builder.addCase(signInAction.fulfilled, (state, action) => {
            state.user = action.payload?.user
            state.tokens = {
                accessToken: action.payload?.accessToken,
                refreshToken: action.payload?.refreshToken
            }
        })
    },
})

export const { logOutAction } = authReducer.actions

export default authReducer.reducer