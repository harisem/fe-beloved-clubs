import { createSlice } from "@reduxjs/toolkit"

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoices: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        fetchInvoiceStart: (state) => {
            state.isfetching = true
        },
        getInvoiceSuccess: (state, action) => {
            state.isFetching = false
            state.invoices = action.payload
        },
        fetchInvoiceFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { fetchInvoiceStart, getInvoiceSuccess, fetchInvoiceFailure } = invoiceSlice.actions
export default invoiceSlice.reducer