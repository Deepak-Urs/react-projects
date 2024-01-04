import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:'1', title: 'Learning Redux Toolkit', content: 'It is good'},
    {id:'2', title: 'Slices...', content: 'It is good as well'},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: { 
            reducer(state, action) {
            // inner.js mutates the state without mutating the state as a whole(pseudo)
                state.push(action.payload);
            }
    }
}})

export const { postAdded } = postsSlice.actions;

// if any changes done here, refelcts in all components
export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;