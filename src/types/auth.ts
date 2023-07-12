export interface LogInRequest {
    email: string;
    password: string;
}

export interface UserModel {
    email: string;
    firstName: string;
    lastName: string;
    role: Role
}

export interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export enum Role {
    ADMIN = 'Admin',
    USER = 'User'
}