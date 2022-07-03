import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subtopicService from './subtopicService'

const initialState = {
    subtopics: [],
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

const subtopicSlice = createSlice({
    name: 'subtopic',
    initialState,
    reducers: {
        reset: (state) => {
            state.subtopics = []
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
    }
})

export const { reset } = subtopicSlice.actions
export default subtopicSlice.reducer