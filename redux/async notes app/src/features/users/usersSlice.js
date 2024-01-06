import { createSlice } from "@reduxjs/toolkit"; 

const initialState = [
    {id: '0', name: 'D U'},
    {id: '1', name: 'Deepak'},
    {id: '2', name: 'Urs'}
]

const usersSlice = createSlice({
    name: ' users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer