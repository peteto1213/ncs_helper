import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import courseService from './courseService'

const initialState = {
    courses: [],
    viewingCourse: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const getAllCourses = createAsyncThunk('course/getAllCourses', async (_, thunkAPI) => {
    try {
        return await courseService.getAllCourses()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getCourseByCourseId = createAsyncThunk('course/getCourseByCourseId', async (courseId, thunkAPI) => {
    try {
        return await courseService.getCourseByCourseId(courseId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => {
            state.courses = []
            state.viewingCourse = {}
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.courses = []
            })
            .addCase(getCourseByCourseId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourseByCourseId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingCourse = action.payload
            })
            .addCase(getCourseByCourseId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.viewingCourse = {}
            })
    }
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer