import { createSlice } from "@reduxjs/toolkit";
import Movie from "../models/Movie";

interface ActionType {
   payload: Movie;
   type: string;
}

const favoriSlice = createSlice({
   name: "favori",
   initialState: [] as Array<Movie>,
   reducers: {         
      // { type: "favori/addFavori", payload: {....}} : ActionType
      addFavori: (state, { payload }: ActionType /* état, action */) => {
         state.push(payload);
         return state;
      },
      // { type: "favori/removeFavori", payload: {....}} : ActionType
      removeFavori: (state, { payload }: ActionType) => {
         state = state.filter(m => m.id !== payload.id);
         return state;
      }
   }
})

export const { addFavori, removeFavori } = favoriSlice.actions;

export default favoriSlice.reducer;
