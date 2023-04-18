import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductSlice";



let store = configureStore({
    reducer : {
        productRed : ProductReducer
    }
})

export default store