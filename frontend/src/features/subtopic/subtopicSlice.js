import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subtopicService from './subtopicService'

const initialState = {
    subtopics: [],
    updatedSubtopic: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getSubtopicsByCourseId = createAsyncThunk('subtopic/getSubtopicsByCourseId', async (courseId, thunkAPI) => {
    try {
        return await subtopicService.getSubtopicsByCourseId(courseId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const addLearningResourceToSubtopic = createAsyncThunk('subtopic/addLearningResourceToSubtopic', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await subtopicService.addLearningResourceToSubtopic(body, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

const subtopicSlice = createSlice({
    name: 'subtopic',
    initialState,
    reducers: {
        reset: (state) => {
            state.subtopics = []
            state.updatedSubtopic = {}
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubtopicsByCourseId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSubtopicsByCourseId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.subtopics = action.payload
            })
            .addCase(getSubtopicsByCourseId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.subtopics = []
            })
            .addCase(addLearningResourceToSubtopic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addLearningResourceToSubtopic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.updatedSubtopic = action.payload
            })
            .addCase(addLearningResourceToSubtopic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.updatedSubtopic = {}
            })
    }
})

export const { reset } = subtopicSlice.actions
export default subtopicSlice.reducer