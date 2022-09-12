import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: {},
        warehouses: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getProductStart: (state) => {
            state.isFetching = true
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false
            state.products = action.payload
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.product = action.payload
        },
        getWarehouses: (state, action) => {
            state.warehouses = action.payload
        },
        getProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        removeProduct: (state) => {
            state.product = {}
            state.warehouses = []
        }
    }
})

export const { getProductStart, getProductsSuccess, getProductSuccess, getWarehouses, getProductFailure, removeProduct } = productSlice.actions
export default productSlice.reducer
