import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "../features/posts/postsSlice"

// 1 - STORE - global store
export const store = configureStore({
    reducer: {
        posts: postsReducer
    }
})