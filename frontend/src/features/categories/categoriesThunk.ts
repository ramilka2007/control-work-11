import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';


export const getCategories = createAsyncThunk(
    'categories/get-all',
    async () => {
        const {data: categories} = await axiosApi.get(`/categories`);
        return categories ?? [];
    });