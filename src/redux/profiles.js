import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profiles",
    initialState: {
        data: null,
        isFetching: false,
        error: false
    },
    reducers: {
        fetchProfileStart: (state) => {
            state.isFetching = true
        },
        getProfileSuccess: (state, action) => {
            state.isFetching = false
            state.data = action.payload
        },
        postProfileSuccess: (state) => {
            state.isFetching = false
        },
        fetchProfileFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { fetchProfileStart, getProfileSuccess, postProfileSuccess, fetchProfileFailure } = profileSlice.actions
export default profileSlice.reducer
