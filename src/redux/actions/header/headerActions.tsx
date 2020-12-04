import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { CloseLogin, OpenLogIn } from "./types";

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

