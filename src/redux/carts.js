import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        carts: [],
        totalCart: 0,
        isFetching: false,
        error: false
    },
    reducers: {
        getCartStart: (state) => {
            state.isFetching = true
        },
        fetchCartStart: (state) => {
            state.isFetching = true
        },
        getCartSuccess: (state, action) => {
            state.isFetching = false
            state.carts = action.payload.carts
            state.totalCart = action.payload.totalCart
        },
        fetchCartSuccess: (state) => {
            state.isFetching = false
        },
        getTotalCart: (state, action) => {
            state.isFetching = false
            state.totalCart = action.payload
        },
        getCartFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        deleteCarts: (state) => {
            state.isFetching = false
            state.carts = []
            state.totalCart = 0
        }
    }
})

export const { getCartStart, fetchCartStart, getCartSuccess, fetchCartSuccess, getTotalCart, getCartFailure, deleteCarts } = cartSlice.actions
export default cartSlice.reducer
