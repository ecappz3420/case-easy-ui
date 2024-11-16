import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './slices/clientSlice'; 

const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export default store;
