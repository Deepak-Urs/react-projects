// 2 - REDUCER:  A slice is a collection of reducer Logic
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // 3 - ACTIONS - actions
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        reset: (state) => {
            state.count = 0
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        }
    }
})

export const {increment, decrement, reset, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer