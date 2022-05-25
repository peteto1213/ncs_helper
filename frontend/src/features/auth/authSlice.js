//Reducer and initial state
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user? user : null,
    isError: false, //error message from server
    isSucess: false,
    isLoading: false,
    message:''
}

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        //Error message passed as payload
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const login = createAsyncThunk(
    'auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            //Error message passed as payload
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', 
    async() => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSucess = false
            state.message = ''
        }
    },
    //extraReducers as Async function
    extraReducers: (builder) => {
        builder
            //Register case (pending, fulfilled, rejected)
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })

            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucess = true
                state.user = action.payload //user passed as payload from server
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //error message from server
                state.user = null
            })
            //Logout case (fulfilled)
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            //Login case (pending, fulfilled, rejected)
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucess = true
                state.user = action.payload //userInfo passed as payload from server
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //error message from server
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer