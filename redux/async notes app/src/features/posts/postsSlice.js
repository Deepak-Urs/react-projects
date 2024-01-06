import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data];
    } catch(err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: { 
            reducer(state,
                 action) {
            // inner.js mutates the state without mutating the state as a whole(pseudo)
                state.posts.push(action.payload);
            },
            prepare(title,
                 content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            coffee: 0,
                            heart: 0,
                            rocket: 0,
                            thumbsUp: 0,
                            wow: 0
                         }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            const existingPayload = state.posts.find(post => post.id === postId)
            if (existingPayload) {
                existingPayload.reactions[reaction]++;
            }
        }
    },
    // helps in getting the async reducers
    extraReducers(builder) {

    }
})

// if any changes done here, refelcts in all components
export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;