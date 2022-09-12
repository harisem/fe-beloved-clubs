import { createSlice } from "@reduxjs/toolkit"

const ongkirSlice = createSlice({
    name: 'ongkir',
    initialState: {
        provinces: [],
        cities: [],
        ongkir: {},
        isFetching: false,
        error: false,
    },
    reducers: {
        getOngkirStart: (state) => {
            state.isFetching = true
        },
        getProvinceSuccess: (state, action) => {
            state.isFetching = false
            state.provinces = action.payload
        },
        getCitySuccess: (state, action) => {
            state.isFetching = false
            state.cities = action.payload
        },
        getOngkirSuccess: (state, action) => {
            state.isFetching = false
            state.ongkir = action.payload
        },
        getOngkirFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { getOngkirStart, getProvinceSuccess, getCitySuccess, getOngkirSuccess, getOngkirFailure } = ongkirSlice.actions
export default ongkirSlice.reducer
