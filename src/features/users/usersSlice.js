import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "0", name: "Homer Simpson" },
    { id: "1", name: "Ned Flanders" },
    { id: "2", name: "Ralph Wiggum" }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;