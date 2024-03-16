import { createSlice } from '@reduxjs/toolkit';
import Offer from '../models/Offer';

interface ActionType {
  payload: Offer;
  type: string;
}

const favoriSlice = createSlice({
  name: 'favori',
  initialState: [] as Array<Offer>,
  reducers: {
    // { type: "favori/addFavori", payload: {....}} : ActionType
    addFavori: (state, { payload }: ActionType /* état, action */) => {
      state.push(payload);
      return state;
    },
    // { type: "favori/removeFavori", payload: {....}} : ActionType
    removeFavori: (state, { payload }: ActionType) => {
      state = state.filter((m) => m.id !== payload.id);
      return state;
    },
  },
});

export const { addFavori, removeFavori } = favoriSlice.actions;

export default favoriSlice.reducer;
