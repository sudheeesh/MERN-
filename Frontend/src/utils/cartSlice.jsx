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
      removeItem: (state, action) => {
         const { _id, forceDelete } = action.payload;
         const existingItem = state.items.find(item => item._id === _id);

         if (existingItem) {
         if (forceDelete || existingItem.quantity === 1) {
         // Remove item fully
         state.items = state.items.filter(item => item._id !== _id);
         } else {
         // Just decrease quantity
         existingItem.quantity -= 1;
         }
       }
     },

         clearCart:(state) => {
            state.items = [];
            localStorage.removeItem("cartItems");
        }
     }
  })

export const {addItem,removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer