import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "./axiosInstance"



export const getMyOrders = createAsyncThunk("orders/myorders", async (_,thunkAPI) => {
    try {
        const {data} = await axiosInstance.get("/orders")
         console.log("API Response (getMyOrders):", data);
        return data.orders
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||"Failed to fetch orders") 
    }
})

const initialState = {
    orders:[],         //all orders
    myOrders:[],       //logged-in-user
    orderDetail:{},    //order-summary
    loading:false,
    error:null
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrders:(state,action) => {
            state.orders = action.payload
        },
        setMyOrders:(state,action) => {
            state.myOrders = action.payload
        },
        setOrderDetail:(state,action) => {
            state.orderDetail = action.payload
        },
        setOrderError:(state,action) => {
            state.error = action.payload
        },
        setOrderLoading:(state,action) => {
            state.loading = action.payload
        },
        clearOrderDate:(state) => {
            state.orders = [],
            state.myOrders = [],
            state.orderDetail = {},
            state.loading = false,
            state.error = null
        }

    },
    extraReducers:(builder) => {
      builder
      .addCase(getMyOrders.pending,(state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state,action) => {
        state.loading = false;
        state.myOrders = action.payload
      })
      .addCase(getMyOrders.rejected, (state,action) => {
        state.loading = false,
        state.error = action.payload
      })
    }
})

export const {setMyOrders,setOrderDetail,setOrders,setOrderError,setOrderLoading, clearOrderDate} = orderSlice.actions

export default orderSlice.reducer;