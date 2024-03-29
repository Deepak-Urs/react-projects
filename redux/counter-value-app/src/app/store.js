import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"

// 1 - STORE - global store
export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})