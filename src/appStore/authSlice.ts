import { createSlice  } from "@reduxjs/toolkit";

export interface User {
    user: any | null;
    isAuthenticated: boolean;
}

const initialState: User = {
    user: null,
    isAuthenticated: false
};  

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
         setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },  
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
