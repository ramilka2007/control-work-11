import {createSlice} from '@reduxjs/toolkit';
import {Category} from '../../types';
import {getCategories} from './categoriesThunk';


interface categoriesState {
    categories: Category[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: categoriesState = {
    categories: [],
    isLoading: false,
    isError: false,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getCategories.fulfilled, (state, {payload: categories}) => {
            state.isLoading = false;
            state.categories = categories;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    selectors: {
        selectCategories: (state) => state.categories,
        selectIsLoadingCategories: (state) => state.isLoading,
    }
});


export const categoriesReducer = categoriesSlice.reducer;
export const {selectCategories, selectIsLoadingCategories} = categoriesSlice.selectors