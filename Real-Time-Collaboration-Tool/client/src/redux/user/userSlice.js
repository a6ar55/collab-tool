import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading: false,
    error:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) =>{
            state.loading = true;
        },
        updateUserSuccess: (state,action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        updateUserFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserSuccess: (state,action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null;
        },
        signOut: (state) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null;
        }

    }
});

export const { signInFailure,signInStart,signInSuccess,
                updateUserStart,updateUserSuccess,deleteUserFailure,
                deleteUserStart,deleteUserSuccess,signOut,updateUserFailure} = userSlice.actions;

export default userSlice.reducer;
