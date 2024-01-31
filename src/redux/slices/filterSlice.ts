
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    location: string;
    bodyType: string;
    brand: string[];
    owners: string;
    budget: string[];
    fuelType: string;
    transmission: string;
}

const initialState: FilterState = {
    location: '',
    bodyType: '',
    brand: [],
    owners: '',
    budget: [],
    fuelType: '',
    transmission: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
