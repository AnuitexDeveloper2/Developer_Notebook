import { UserModel } from "../../../types/auth";

export interface LoginResponse {
    result: true;
    accessToken: string;
    refreshToken: string;
    user: UserModel;
}