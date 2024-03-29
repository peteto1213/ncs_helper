import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import blogService from './blogService'

const initialState = {
    blogs: [],
    viewingBlog: '',
    creatingBlog: '',
    updatedBlog: '',
    userBlogs: [],
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

//Create a blog - private
export const createBlog = createAsyncThunk('/blog/createBlog', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await blogService.createBlog(body, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get User's blogs - private
export const getUserBlogs = createAsyncThunk('blog/getUserBlogs', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        
        return await blogService.getUserBlogs(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//User update own blog - private
export const updateBlog = createAsyncThunk('blog/updateBlog', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await blogService.updateBlog(body.id, {content: body.content}, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//User delete own blog - private
export const deleteBlog = createAsyncThunk('/blog/deleteBlog', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await blogService.deleteBlog(id, token)
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
            state.creatingBlog = {}
            state.updatedBlog = {}
            state.userBlogs = []
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
                state.viewingBlog = null
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
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.creatingBlog = action.payload
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.creatingBlog = null
            })
            .addCase(getUserBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userBlogs = action.payload
            })
            .addCase(getUserBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.userBlogs = []
                state.message = action.payload
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.updatedBlog = action.payload
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                localStorage.setItem("deletedBlog", JSON.stringify(action.payload))
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const {reset} = blogSlice.actions
export default blogSlice.reducer