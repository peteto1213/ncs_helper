import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogCategoryService from './blogCategoryService'

const initialState = {
    blogCategories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

//get all blog categories 
export const getAllBlogCategories = createAsyncThunk('blogCategory/getAllBlogCategories', async(_, thunkAPI) => {
    try {
        return await blogCategoryService.getAllBlogCategories()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const blogCategorySlice = createSlice({
    name: 'blogCategory',
    initialState,
    reducers: {
        reset: (state) => {
            state.blogCategories = []
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.blogCategories = action.payload
            })
            .addCase(getAllBlogCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.blogCategories = []
            })
    }
})

export const {reset} = blogCategorySlice.actions
export default blogCategorySlice.reducer

