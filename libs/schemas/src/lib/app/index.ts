export interface AuthPayload {
    token?: string;
    user?: User;
}

export interface IMutation {
    signup(username: string, email: string, password: string): AuthPayload | Promise<AuthPayload>;
    login(email: string, password: string): AuthPayload | Promise<AuthPayload>;
}

export interface IQuery {
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id?: string;
    password: string;
    username: string;
    email: string;
}
