import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { http } from "../../../helper/request";
import { LogInRequest } from "../../../types/auth";
import { AuthActions, LogOut } from "./types";

export const SignInAction: ActionCreator<
    ThunkAction<Promise<string>,
        LogInRequest,
        null,
        AuthActions>> = (data) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'POST',
                    path: 'auth/login',
                    body: data
                }
                try {
                    const result = await http(config) as any
                    if (result.parsedBody.error) {
                        return result.parsedBody.error
                    }
                    const LoginAction: AuthActions = {
                        type: 'LOGIN',
                        result: result.parsedBody
                    }
                    dispatch(LoginAction)
                } catch (error) {
                    return error
                }
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
                    type: 'REGISTER',
                    result: result.parsedBody
                }
                dispatch(RegisterAction)
            }
        }


export const LogOutAction: ActionCreator<ThunkAction<void, null, null, LogOut>> = () => {
    localStorage.clear()
    return (dispatch: Dispatch) => {
        const logout: LogOut = {
            type: "LogOut"
        };
        dispatch(logout)
    }
}