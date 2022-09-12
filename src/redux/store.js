// import { configureStore } from "@reduxjs/toolkit"
// import carts from "./carts"
// import products from "./products"
// import sliders from "./sliders"
// import user from "./user"
// import warehouses from "./warehouses"

// export default configureStore({
//     reducer: {
//         user: user,
//         carts: carts,
//         sliders: sliders,
//         products: products,
//         warehouses: warehouses
//     }
// })

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import user from "./user"
import sliders from "./sliders"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import products from "./products"
import warehouses from "./warehouses"
import carts from "./carts"
import ongkir from "./ongkir"
import orders from "./orders"
import profiles from "./profiles"
import invoices from "./invoices"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({
    user: user,
    carts: carts,
    ongkir: ongkir,
    orders: orders,
    sliders: sliders,
    products: products,
    profiles: profiles,
    invoices: invoices,
    warehouses: warehouses,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export let persistor = persistStore(store)
