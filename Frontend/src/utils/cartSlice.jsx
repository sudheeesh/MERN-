import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
       items:[]
    },
    reducers:{
        addItem:(state, action) => {
         const item = action.payload
         const existingItem = state.items.find(
            (i) => i._id === item._id
         )
         if(existingItem){
            existingItem.quantity += 1
         }else {
            state.items.push({...item,quantity:1})
         }
         
        },
        removeItem:(state,action) => {
            const item = action.payload
            const existingItem = state.items.find(
               (i) => i._id === item._id 
            )
            if(existingItem){
              if(existingItem.quantity === 1){
                state.items= state.items.filter((i) => i._id !== item._id)
              }else{
                existingItem.quantity -= 1
              }
            }
        },

        clearCart:(state) => {
            state.items = []
        }
    }
})

export const {addItem,removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer