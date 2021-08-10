import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { CloseLogin, CloseRegister, OpenLogIn, OpenRegister } from "./types";

export const OpenSignInAction: ActionCreator<ThunkAction<void,null,null,OpenLogIn>> = () => {
    return (dispatch: Dispatch) => {
        const open: OpenLogIn = {
            type: "OpenLogin"
        };
        dispatch(open);
    };
};


export const CloseLogInAction: ActionCreator<ThunkAction<void,null,null,CloseLogin>> = () => {
    return (dispatch: Dispatch) => {
        const close: CloseLogin = {
            type: "CloseLogin"
        };
        dispatch(close);
    };
};

export const OpenRegisterAction: ActionCreator<ThunkAction<void,null,null,OpenRegister>> = () => {
    return (dispatch: Dispatch) => {
        const open: OpenRegister = {
            type: "OpenRegister"
        };
        dispatch(open)
    };
}

export const CloseRegisterAction: ActionCreator<ThunkAction<void,null,null,OpenRegister>> = () => {
    return (dispatch: Dispatch) => {
        const close: CloseRegister = {
            type: "CloseRegister"
        };
        dispatch(close)
    }
}


