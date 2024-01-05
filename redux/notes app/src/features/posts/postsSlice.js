import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";


const initialState = [
    {id:'1',
     title: 'Learning Redux Toolkit',
     content: 'It is good',
     date: sub(new Date(),
     {minutes: 10}).toISOString(),
     reactions: {
        coffee: 0,
        heart: 0,
        rocket: 0,
        thumbsUp: 0,
        wow: 0
     }
    },
    {id:'2',
     title: 'Slices...',
     content: 'It is good as well',
     date: sub(new Date(),
     {minutes: 10}).toISOString(),
     reactions: {
        coffee: 0,
        heart: 0,
        rocket: 0,
        thumbsUp: 0,
        wow: 0
     }
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: { 
            reducer(state,
                 action) {
            // inner.js mutates the state without mutating the state as a whole(pseudo)
                state.push(action.payload);
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
            const existingPayload = state.find(post => post.id === postId)
            if (existingPayload) {
                existingPayload.reactions[reaction]++;
            }
        }
    }
})

// if any changes done here, refelcts in all components
export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;