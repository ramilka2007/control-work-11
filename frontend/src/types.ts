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

export interface ItemForm {
    title: string;
    description: string;
    image: string | null;
    price: number;
    category: string;
}

export interface IItem {
    title: string;
    description: string;
    image: string | null;
    price: number;
    category: string;
}

export interface AllItems {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    user: User;
    price: number;
}