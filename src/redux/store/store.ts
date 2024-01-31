import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../slices/filterSlice'; 
import recordsReducer from '../slices/recordsSlice'; 
export const store = configureStore({
  reducer: {
    filters: filterReducer,
    records: recordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
