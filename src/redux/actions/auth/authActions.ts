import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { LogInRequest } from "../../../types/auth";
import { AuthActions } from "./types";

export const SignInAction: ActionCreator<
    ThunkAction<Promise<void>,
        LogInRequest,
        null,
        AuthActions>> = (data) => {
            return async (dispatch: Dispatch) => {

            }
        }