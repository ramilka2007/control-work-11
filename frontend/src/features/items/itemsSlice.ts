import {createSlice} from '@reduxjs/toolkit';
import {AllItems, IItem} from '../../types';
import {addItem, getItems, getItemsByCategory, getOneItemById} from './itemsThunk';


interface itemsState {
    items: AllItems[];
    item: IItem | null;
    isLoading: boolean;
    addLoading: boolean;
    deleteLoading: boolean;
    isError: boolean;
}

const initialState: itemsState = {
    items: [],
    item: null,
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    isError: false,
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
            console.log()
        }).addCase(getItems.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getOneItemById.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getOneItemById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.item = action.payload;
        }).addCase(getOneItemById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getItemsByCategory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getItemsByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        }).addCase(getItemsByCategory.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(addItem.pending, (state) => {
            state.addLoading = true;
            state.isError = false;
        }).addCase(addItem.fulfilled, (state) => {
            state.addLoading = false;
        }).addCase(addItem.rejected, (state) => {
            state.addLoading = false;
            state.isError = true;
        });
    },
    selectors: {
        selectItems: (state) => state.items,
        selectIsLoadingItems: (state) => state.isLoading,
        selectAddLoadingItems: (state) => state.addLoading,
    }
});


export const itemsReducer = itemsSlice.reducer;
export const {selectItems, selectIsLoadingItems, selectAddLoadingItems} = itemsSlice.selectors