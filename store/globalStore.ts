import { configureStore } from '@reduxjs/toolkit';
import Offer from '../models/Offer';
import offerReducer from '../reducers/offerReducer';

const globalStore = configureStore({
  reducer: {
    favori: offerReducer,
  },
});

export interface GlobalStoreProps {
  favori: Array<Offer>;
}

export default globalStore;
