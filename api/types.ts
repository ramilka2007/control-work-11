import { Model } from 'mongoose';

export interface UserFields {
    username: string;
    displayName: string;
    phone: string;
    password: string;
    token: string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;