import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        data: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getSliderStart: (state) => {
            state.isFetching = true
        },
        getSliderSuccess: (state, action) => {
            state.isFetching = false
            state.data = action.payload
        },
        getSliderFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { getSliderStart, getSliderSuccess, getSliderFailure } = sliderSlice.actions
export default sliderSlice.reducer
