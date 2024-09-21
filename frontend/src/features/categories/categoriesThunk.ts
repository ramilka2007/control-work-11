import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Category} from "../../types";

export const getCategories = createAsyncThunk<Category[]>(
  'categories/get-all',
  async () => {
    const { data: categories } = await axiosApi.get(`/categories`);
    return categories ?? [];
  },
);
