import { createSlice } from "@reduxjs/toolkit"

const warehouseSlice = createSlice({
    name: 'warehouses',
    initialState: {
        data: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getWarehouseStart: (state) => {
            state.isFetching = true
        },
        getWarehouseSuccess: (state, action) => {
            state.isFetching = false
            state.data = action.payload
        },
        getWarehouseFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { getWarehouseStart, getWarehouseSuccess, getWarehouseFailure } = warehouseSlice.actions
export default warehouseSlice.reducer
