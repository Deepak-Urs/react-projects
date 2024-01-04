import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "../features/posts/postsSlice"
import usersReducer from "../features/users/usersSlice"

// 1 - STORE - global store
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})