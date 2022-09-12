import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        response: null,
        isFetching: false,
        error: false
    },
    reducers: {
        orderStart: (state) => {
            state.isFetching = true
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false
            state.orders = action.payload
        },
        postOrderSuccess: (state, action) => {
            state.isFetching = false
            state.response = action.payload
        },
        getOrderFailure: (state, action) => {
            state.isFetching = false
            state.response = action.payload
            state.error = true
        },
        postOrderFailure: (state, action) => {
            state.isFetching = false
            state.response = action.payload
            state.error = true
        },
        removeOrder: (state) => {
            state.orders = []
            state.response = null
        }
    }
})

export const { orderStart, getOrderSuccess, postOrderSuccess, getOrderFailure, postOrderFailure, removeOrder } = orderSlice.actions
export default orderSlice.reducer
