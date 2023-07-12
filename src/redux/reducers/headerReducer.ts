import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
    readonly openLogin: boolean
    readonly openRegister: boolean
}


const initialState: HeaderState = {
    openLogin: false,
    openRegister: false
}

export const headerReducer = createSlice({
    name: 'header',
    initialState: initialState,
    reducers: {
        handleLoginModal(state, action: PayloadAction<boolean>) {
            state.openLogin = action.payload
        },
        handleRegisterModal(state, action: PayloadAction<boolean>) {
            state.openRegister = action.payload
        }
    }
})

export const { handleLoginModal, handleRegisterModal } = headerReducer.actions

export default headerReducer.reducer