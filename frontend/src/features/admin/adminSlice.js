import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from './adminService'

const initialState = {
    users: [],
    operatingCourse: {},
    createdSubtopic: {},
    deleteLearningResourceAction: false,
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

//update course by course id
export const updateCourseByCourseId = createAsyncThunk('admin/updateCourseByCourseId', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.updateCourseByCourseId(body, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message 
        || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//create subtopic
export const createSubtopic = createAsyncThunk('admin/createSubtopic', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.createSubtopic(body, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message 
        || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//delete resource of a subtopic
export const deleteLearningResourceOfSubtopic = createAsyncThunk('admin/deleteLearningResourceOfSubtopic', async(body, thunkAPI) => {
    try {
        const token = body.token
        const newBody = {
            subtopic: body.subtopic
        }
        const id = body.resourceId

        return await adminService.deleteLearningResourceOfSubtopic(id, newBody, token)

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
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.users = []
            })
            .addCase(updateCourseByCourseId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCourseByCourseId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.operatingCourse = action.payload
            })
            .addCase(updateCourseByCourseId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.operatingCourse = {}
            })
            .addCase(createSubtopic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSubtopic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.createdSubtopic = action.payload
            })
            .addCase(createSubtopic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.createdSubtopic = {}
            })
            .addCase(deleteLearningResourceOfSubtopic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteLearningResourceOfSubtopic.fulfilled, (state) => {
                state.isLoading = false
                state.deleteLearningResourceAction = true
            })
            .addCase(deleteLearningResourceOfSubtopic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.deleteLearningResourceAction = false
            })
    }
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer