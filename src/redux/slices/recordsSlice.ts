
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Record {
    location: string;
    model: string;

}

interface RecordsState {
    records: Record[];
}

const initialState: RecordsState = {
    records: [],
};


const recordsSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        addRecord: (state, action: PayloadAction<Record>) => {
            state.records.push(action.payload);
        },
    },
});

export const { addRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
