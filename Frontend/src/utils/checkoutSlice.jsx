import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    shippingAddress:{
        fullName:'',
        address:'',
        city:'',
        postalCode:'',
        country:'',
        phone:'',
    },
    paymentMethod:'UPI'
}

const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        saveShippingAddress:(state,action)=> {
            state.shippingAddress = action.payload
        },
        savePaymentMethod:(state,action) => {
            state.paymentMethod = action.payload
        },
        resetCheckout:() => initialState,
    },
})

export const {saveShippingAddress,savePaymentMethod,resetCheckout} = checkoutSlice.actions

export default checkoutSlice.reducer