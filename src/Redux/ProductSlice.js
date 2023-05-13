import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getProducts = createAsyncThunk("product/getProducts", async function () {
    let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products`)
    console.log(data.data);
    return data
})

let productSlice = createSlice({
    name: "product",
    initialState: { counter: 0, products: [] },
    reducers: {
        increase: (state, action) => {
            state.counter += action.payload
        },
        decrease: (state) => {
            state.counter -= 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase('fulfilled', (state, action) => {
            state.products = action.payload
        })
    }
})

export let ProductReducer = productSlice.reducer;
export let { increase, decrease } = productSlice.actions