export interface User {
    _id: string;
    username: string;
    displayName: string;
    phone: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    displayName: string;
    phone: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface Category {
    _id: string;
    title: string;
}