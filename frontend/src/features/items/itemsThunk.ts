import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {AllItems, GlobalError, IItem} from "../../types";
import {isAxiosError} from "axios";

export const getItems = createAsyncThunk<AllItems[]>('items/get-all', async () => {
  const { data: items } = await axiosApi.get(`/items`);
  return items ?? [];
});

export const getOneItemById = createAsyncThunk<AllItems, string>(
  'items/get-one-by-id',
  async (item_id: string) => {
    const {data: item} = await axiosApi.get(`/items/${item_id}`);
    return item ?? null;
  },
);

export const getItemsByCategory = createAsyncThunk<AllItems[], string>(
  'items/get-by-category',
  async (category_id: string) => {
    const {data: categoryItems} = await axiosApi.get(`/items?category=${category_id}`);
    return categoryItems ?? [];
  },
);

export const addItem = createAsyncThunk<IItem, FormData, { rejectValue: GlobalError }>(
  'items/add',
  async (item: FormData, { getState, rejectWithValue }) => {
    const token = getState().users.user.token;
    try {
        if (token) {
            await axiosApi.post(`/items`, item, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data);
        }

        throw e;
    }
  },
);

export const deleteItemById = createAsyncThunk<AllItems, string, { rejectValue: GlobalError }>(
  'items/delete-by-id',
  async (item_id: string, { getState, rejectWithValue }) => {
    const token = getState().users.user.token;
    try {
        if (token) {
            await axiosApi.delete(`items/${item_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data);
        }

        throw e;
    }
  },
);
