// src/store/slices/clientSlice.js
import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    details: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.details = action.payload;
    },
  },
});

// Export the action as a named export
export const { setClient } = clientSlice.actions;

export default clientSlice.reducer; // This is the default export
