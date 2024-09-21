import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';


export const getItems = createAsyncThunk(
    'items/get-all',
    async () => {
        const {data: items} = await axiosApi.get(`/items`);
        return items ?? [];
    });

export const getOneItemById = createAsyncThunk(
    'items/get-one-by-id',
    async (item_id: string) => {
        const response = await axiosApi.get(`/items/${item_id}`);
        return response.data ?? null;
    });

export const getItemsByCategory = createAsyncThunk(
    'items/get-by-category',
    async (category_id: string) => {
        const response = await axiosApi.get(`/items?category=${category_id}`);
        return response.data ?? [];
    });

export const addItem = createAsyncThunk(
    'items/add',
    async (item: FormData, {getState}) => {
        const token = getState().users.user.token;
        if (token) {
            await axiosApi.post(`/items`, item, {headers: {'Authorization': `Bearer ${token}`}} );
        }
    });