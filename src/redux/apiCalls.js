import { loginStart, loginSuccess, loginFailure, registerStart, registerFailure, registerSuccess } from "./user"
// import { publicRequest, userRequest } from "../requestMethods"
import { getSliderFailure, getSliderStart, getSliderSuccess } from "./sliders"
import { getProductFailure, getProductsSuccess, getProductStart, getProductSuccess, getWarehouses } from "./products"
import { getWarehouseFailure, getWarehouseStart, getWarehouseSuccess } from "./warehouses"
import { getCartFailure, getCartStart, getCartSuccess, getTotalCart, fetchCartStart, fetchCartSuccess, deleteCarts } from "./carts"
import { getCitySuccess, getOngkirFailure, getOngkirStart, getOngkirSuccess, getProvinceSuccess } from "./ongkir"
import { getOrderFailure, getOrderSuccess, orderStart, postOrderFailure, postOrderSuccess } from "./orders"
import { fetchProfileStart, getProfileSuccess, postProfileSuccess, fetchProfileFailure } from "./profiles"
import axios from "axios"
import { fetchInvoiceFailure, fetchInvoiceStart, getInvoiceSuccess } from "./invoices"

const privateRequest = axios.create({
    baseURL: "http://127.0.0.1:8004/api/v1/"
})

const publicRequest = axios.create({
    baseURL: "http://127.0.0.1:8004/api/v1/"
})

// Auth
export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("auth/login", user)
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token, profile: res.data.profile }))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, payload) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post("auth/register", payload)
        dispatch(registerSuccess())
        return res
    } catch (err) {
        dispatch(registerFailure())
    }
}

// Profile
export const getProfile = async (dispatch, token) => {
    dispatch(fetchProfileStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await privateRequest.get("profile")
        dispatch(getProfileSuccess(res.data.data))
    } catch (err) {
        dispatch(fetchProfileFailure())
    }
}

export const updateProfile = async (dispatch, payload, token) => {
    dispatch(fetchProfileStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await privateRequest.post("profile/update", payload)
        dispatch(postProfileSuccess())
    } catch (err) {
        dispatch(fetchProfileFailure())
    }
}

// Slider
export const sliders = async (dispatch) => {
    dispatch(getSliderStart())
    try {
        const res = await publicRequest.get("slider")
        dispatch(getSliderSuccess(res.data.data))
    } catch (err) {
        dispatch(getSliderFailure())
    }
}

// Products
export const products = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("product")
        dispatch(getProductsSuccess(res.data.data.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}

export const getProduct = async (dispatch, slug) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get(`product/${slug}`)
        dispatch(getProductSuccess(res.data.data))
        dispatch(getWarehouses(res.data.data.warehouses))
    } catch (err) {
        dispatch(getProductFailure())
    }
}


// Carts
// export const getCarts = async (dispatch) => {
//     dispatch(getCartStart())
//     try {
//         const res = await userRequest.get("cart")
//         if (res.status === 200) {
//             const data = res.data.data
//             const sum = data.map((d) => d.quantity).reduce((prev, curr) => prev + curr, 0)
//             dispatch(getCartSuccess({ carts: data, totalCart: sum }))
//         }
//         if (res.status === 404) dispatch(getTotalCart(0))
//     } catch (err) {
//         if (err.response.status === 404) {
//             dispatch(getTotalCart(0))
//         } else {
//             dispatch(getCartFailure())
//         }
//         // console.log(err.response.status)
//     }
// }

export const getCarts = async (dispatch, token) => {
    dispatch(getCartStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await privateRequest.get("cart")
        if (res.status === 200) {
            const data = res.data.data
            const sum = data.map((d) => d.quantity).reduce((prev, curr) => prev + curr, 0)
            dispatch(getCartSuccess({ carts: data, totalCart: sum }))
        }
        if (res.status === 404) dispatch(getTotalCart(0))
    } catch (err) {
        if (err.response.status === 404) {
            dispatch(getTotalCart(0))
        } else {
            dispatch(getCartFailure())
        }
    }
}

export const addToCart = async (dispatch, payload, token) => {
    dispatch(fetchCartStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await privateRequest.post("cart", payload)
        dispatch(fetchCartSuccess())
        getCarts(dispatch, token)
    } catch (err) {
        dispatch(getCartFailure())
    }
}

// export const addToCart = async (dispatch, cart) => {
//     dispatch(fetchCartStart())
//     try {
//         await userRequest.post("cart", cart)
//         // if (res.status === 201) {
//         dispatch(fetchCartSuccess())
//         getCarts(dispatch)
//         // }
//     } catch (err) {
//         dispatch(getCartFailure())
//     }
// }

export const removeCarts = async (dispatch, token) => {
    dispatch(fetchCartStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await privateRequest.post("removeCarts")
        dispatch(deleteCarts())
    } catch (err) {
        dispatch(getCartFailure())
    }
}

export const removeCart = async (dispatch, payload, token) => {
    dispatch(fetchCartStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await privateRequest.post("removeCart", payload)
        dispatch(fetchCartSuccess())
    } catch (err) {
        dispatch(getCartFailure())
    }
}

// export const removeCarts = async (dispatch) => {
//     dispatch(fetchCartStart())
//     try {
//         await userRequest.post("removeCarts")
//         dispatch(deleteCarts())
//     } catch (err) {
//         dispatch(getCartFailure())
//     }
// }

// export const removeCart = async (dispatch, cart_id) => {
//     dispatch(fetchCartStart())
//     try {
//         await userRequest.post("removeCart", cart_id)
//         dispatch(fetchCartSuccess())
//     } catch (err) {
//         dispatch(getCartFailure())
//     }
// }


// Warehouses
export const warehouses = async (dispatch) => {
    dispatch(getWarehouseStart())
    try {
        const res = await publicRequest.get("warehouse")
        dispatch(getWarehouseSuccess(res.data.data.data))
    } catch (err) {
        dispatch(getWarehouseFailure())
    }
}

// Ongkir
export const getProvinces = async (dispatch) => {
    dispatch(getOngkirStart())
    try {
        const res = await publicRequest.get("ongkir/provinces")
        dispatch(getProvinceSuccess(res.data.data))
    } catch (err) {
        dispatch(getOngkirFailure())
    }
}

export const getCities = async (dispatch, city) => {
    dispatch(getOngkirStart())
    try {
        const res = await publicRequest.get("ongkir/cities", { params: { q: city } })
        dispatch(getCitySuccess(res.data.data))
    } catch (err) {
        dispatch(getOngkirFailure())
    }
}

export const getOngkir = async (dispatch, payload) => {
    dispatch(getOngkirStart())
    try {
        const res = await publicRequest.post("ongkir/check", payload)
        dispatch(getOngkirSuccess(res.data.data[0]))
    } catch (err) {
        dispatch(getOngkirFailure())
    }
}

// Checkout
export const checkout = async (dispatch, payload, token) => {
    dispatch(orderStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await privateRequest.post("checkout", payload)
        dispatch(postOrderSuccess(res.data))
        // removeCarts(dispatch, token)
        return res.data[0]
    } catch (err) {
        dispatch(postOrderFailure(err))
    }
}

// export const checkout = async (dispatch, payload) => {
//     dispatch(orderStart())
//     try {
//         const res = await userRequest.post("checkout", payload)
//         dispatch(postOrderSuccess(res.data))
//         return res.data[0]
//         // removeCarts(dispatch)
//     } catch (err) {
//         dispatch(postOrderFailure(err))
//     }
// }

// Order
export const getOrders = async (dispatch, snap_token, token) => {
    dispatch(orderStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await privateRequest.get(`order/${snap_token}`)
        dispatch(getOrderSuccess(res.data.data))
    } catch (err) {
        dispatch(getOrderFailure(err))
    }
}

// Invoice
export const getTransactions = async (dispatch, token) => {
    dispatch(fetchInvoiceStart())
    try {
        privateRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await privateRequest.get("invoice")
        dispatch(getInvoiceSuccess(res.data.data))
    } catch (err) {
        dispatch(fetchInvoiceFailure())
    }
}

// export const getOrders = async (dispatch, snap_token) => {
//     dispatch(orderStart())
//     try {
//         const res = await userRequest.get(`order/${snap_token}`)
//         dispatch(getOrderSuccess(res.data.data))
//     } catch (err) {
//         dispatch(getOrderFailure(err))
//     }
// }
