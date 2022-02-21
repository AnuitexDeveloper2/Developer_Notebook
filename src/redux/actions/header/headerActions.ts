import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { CloseError, CloseLogin, CloseRegister, OpenError, OpenLogIn, OpenRegister } from "./types";

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

export const OpenErrorAction: ActionCreator<ThunkAction<void,null,null,OpenError>> = (error:string) => {
    return (dispatch: Dispatch) => {
        const open: OpenError = {
            type: "OpenError",
            error
        };
        dispatch(open)
    }
}

export const CloseErrorAction: ActionCreator<ThunkAction<void,null,null,CloseError>> = () => {
    return (dispatch: Dispatch) => {
        const open: CloseError = {
            type: "CloseError"
        };
        dispatch(open)
    }
}


