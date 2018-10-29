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
    roles?: string[];
    password: string;
    username: string;
    email: string;
}
