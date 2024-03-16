import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Filter from '../models/Filter';

const initialState: Filter = {
  query: null,
  carModelYear: null,
  minPrice: null,
  maxPrice: null,
  country: null,
  city: null,
  description: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addOrUpdateFilter: (state, action: PayloadAction<{ key: keyof Filter; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    removeFilter: (state, action: PayloadAction<keyof Filter>) => {
      const key = action.payload;
      if (key in state) {
        state[key] = null;
      }
    },
    clearFilters: () => initialState,
  },
});

export const { addOrUpdateFilter, removeFilter, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
