import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../../helper/request";
import { LogInRequest, RegisterForm } from "../../../types/auth";
import { LoginResponse } from "./types";

export const signInAction = createAsyncThunk<LoginResponse | undefined, LogInRequest>(
    'auth/signIn',
    async (data: LogInRequest) => {
        const result = await http<LoginResponse, LogInRequest>(
            {
                path: 'auth/login',
                method: 'post',
                body: data,
            },
        );
        console.log('LogIn:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);


export const registerAction = createAsyncThunk<any | undefined, RegisterForm>(
    'auth/register',
    async (data: RegisterForm) => {
        const result = await http<any, RegisterForm>(
            {
                path: 'auth/register',
                method: 'post',
                body: data,
            },
        );
        console.log('Register:');
        console.log(result.parsedBody);
        return result.parsedBody;
    },
);