import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import blogService from './blogService'

const initialState = {
    blogs: [],
    viewingBlog: '',
    isError: false,
    isSuccess: false,
    isLoading:false,
    message: ''
}

//Get all blogs
export const getAllBlogs = createAsyncThunk('blog/getAllBlogs', async(_, thunkAPI) => {
    try {
        return await blogService.getAllBlogs()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get blogs by blog category id
export const getBlogsByCategoryId = createAsyncThunk('blog/getBlogsByCategoryId', async(blogCategoryId, thunkAPI) => {
    try {
        return await blogService.getBlogsByCategoryId(blogCategoryId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get blogs by search text (filtered blog title)
export const getBlogsByFilteredBlogTitle = createAsyncThunk('blog/getBlogsByFilteredBlogTitle', async(searchText, thunkAPI) => {
    try {
        return await blogService.getBlogsByFilteredBlogTitle(searchText)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get single blog details by blog id
export const getBlogByBlogId = createAsyncThunk('blog/getBlogByBlogId', async(blogId, thunkAPI) => {
    try {
        return await blogService.getBlogByBlogId(blogId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Like a blog
export const likeBlog = createAsyncThunk('blog/likeBlog', async(body, thunkAPI) => {
    try {
        return await blogService.likeBlog(body)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Comment a blog
export const commentBlog = createAsyncThunk('blog/commentBlog', async(body, thunkAPI) => {
    try {
        return await blogService.commentBlog(body)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        reset: (state) => {
            state.blogs = []
            state.viewingBlog = ''
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.blogs = action.payload
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.blogs = []
            })
            .addCase(getBlogsByCategoryId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlogsByCategoryId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.blogs = action.payload
            })
            .addCase(getBlogsByCategoryId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBlogsByFilteredBlogTitle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlogsByFilteredBlogTitle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.blogs = action.payload
            })
            .addCase(getBlogsByFilteredBlogTitle, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBlogByBlogId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlogByBlogId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingBlog = action.payload
            })
            .addCase(getBlogByBlogId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingBlog = action.payload
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(commentBlog.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingBlog = action.payload
            })
            .addCase(commentBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
    }
})

export const {reset} = blogSlice.actions
export default blogSlice.reducer