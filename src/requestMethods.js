import axios from "axios"

const BASE_URL = "http://127.0.0.1:8004/api/v1/"
// const TOKEN = localStorage.getItem("persist:root").user ?
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).token : ""
const user = JSON.parse(localStorage.getItem("persist:root"))?.user
const currentUser = user && JSON.parse(user)
const TOKEN = currentUser?.token
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).token : ""
// const TOKEN = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''

// console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Authorization': `Bearer ${TOKEN}` }
})