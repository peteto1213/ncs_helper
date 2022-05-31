//Initial state and reducers for authentication
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

//User Initial State
const initialState = {
    user: user ? user : null, //user token
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register a user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        //payload returned from authService
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        //pass in the error message as the payload if any error is caught
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout a user
export const logout = createAsyncThunk('auth/logout',
    async() => {
        await authService.logout()
    }
)

//Login a user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
}
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    // Used to handle redux state based on user's actions (register, logout, login)
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer