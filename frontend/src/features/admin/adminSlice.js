import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from './adminService'

const initialState = {
    users: [],
    courses: [],
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//get all users
export const getAllUsers = createAsyncThunk('admin/allUsers', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.getAllUsers(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message 
        || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.users = []
            })
    }
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer