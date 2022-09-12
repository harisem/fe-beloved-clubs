import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        profile: null,
        token: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        registerStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload.user
            state.profile = action.payload.profile
            state.token = action.payload.token
        },
        registerSuccess: (state) => {
            state.isFetching = false
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        registerFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { loginStart, registerStart, loginSuccess, registerSuccess, loginFailure, registerFailure } = userSlice.actions
export default userSlice.reducer
