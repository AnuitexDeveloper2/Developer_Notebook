import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { http } from "../../../helper/request";
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

export const RegisterAction: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        AuthActions>> = (data) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'POST',
                    path: 'auth/register',
                    body: data
                }
                const result = await http(config)
                const RegisterAction: AuthActions = {
                    type: 'Register',
                    result: result.parsedBody
                }
                dispatch(RegisterAction)
                debugger
            }
        }