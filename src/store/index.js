import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './slices/clientSlice'; 
import teamMemberReducer from './slices/teamMemberSlice';

const store = configureStore({
  reducer: {
    client: clientReducer,
    teamMember: teamMemberReducer
  },
});

export default store;
