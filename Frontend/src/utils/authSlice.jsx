import { createSlice } from "@reduxjs/toolkit"

const userInfoStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
:null

const initialState = {
    user:userInfoStorage,
    isAuthenticated: !!userInfoStorage
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess:(state,action) => {
            state.user = action.payload
            state.isAuthenticated = true
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout:(state) =>{
            state.user = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {loginSuccess,logout} = authSlice.actions

export default authSlice.reducer