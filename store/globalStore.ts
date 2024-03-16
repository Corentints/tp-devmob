import { configureStore } from '@reduxjs/toolkit';
import Offer from '../models/Offer';
import offerReducer from '../reducers/offerReducer';
import filterReducer from '../reducers/filterReducer';
import Filter from '../models/Filter';

const globalStore = configureStore({
  reducer: {
    favori: offerReducer,
    filter: filterReducer,
  },
});

export interface GlobalStoreProps {
  favori: Array<Offer>;
  filter: Filter;
}

export default globalStore;
