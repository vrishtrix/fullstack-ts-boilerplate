export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface AuthPayload {
    token?: string;
    user?: User;
}

export interface IMutation {
    signup(username: string, email: string, password: string): AuthPayload | Promise<AuthPayload>;
    login(email: string, password: string): AuthPayload | Promise<AuthPayload>;
}

export interface IQuery {
    findUser(username: string): User | Promise<User>;
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id?: string;
    password: string;
    username: string;
    roles?: Role[];
    email: string;
    token?: string;
    lastLogin?: number;
    lastLogout?: number;
}
