import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
 
    initialState:{
        user: JSON.parse(window.localStorage.getItem('user'))|| null 
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
            console.log(action.payload)
            window.localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUser: (state)=>{
            state.user = null;
            window.localStorage.removeItem('user')
        },
    }
});

export const {setUser, removeUser} = authSlice.actions

export default authSlice.reducer;