import { createSlice } from "@reduxjs/toolkit";

const teamMemberSlice = createSlice({
    name: 'teamMember',
    initialState: {
        details: null
    },
    reducers: {
        setTeamMember: (state, action) => {
            state.details = action.payload;
        }
    }
})
export const {setTeamMember} = teamMemberSlice.actions
export default teamMemberSlice.reducer;