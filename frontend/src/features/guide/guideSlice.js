import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import guideService from './guideService'

const initialState = {
    guides: [],
    viewingGuide: {},
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

//get all guides
export const getAllGuides = createAsyncThunk('/guide/getAllGuides', async(_, thunkAPI) => {
    try {
        
        return await guideService.getAllGuides()

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get guides by subtopic id
export const getGuidesBySubtopicId = createAsyncThunk('/guide/getGuidesBySubtopicId', async(subtopic, thunkAPI) => {
    try {
        return await guideService.getGuidesBySubtopicId(subtopic)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get guides by guide name
export const getGuidesByFilteredGuideName = createAsyncThunk('/guide/getGuidesByFilteredGuideName', async(searchText, thunkAPI) => {
    try {
        return await guideService.getGuidesByFilteredGuideName(searchText)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get guide details by guide id
export const getGuideByGuideId = createAsyncThunk('/guide/getGuideByGuideId', async(id, thunkAPI) => {
    try {
        return await guideService.getGuideByGuideId(id)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGuides.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllGuides.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.guides = action.payload
            })
            .addCase(getAllGuides.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.guides = []
            })
            .addCase(getGuidesBySubtopicId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuidesBySubtopicId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.guides = action.payload
            })
            .addCase(getGuidesBySubtopicId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.guides = []
            })
            .addCase(getGuidesByFilteredGuideName.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuidesByFilteredGuideName.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.guides = action.payload
            })
            .addCase(getGuidesByFilteredGuideName.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.guides = []
            })
            .addCase(getGuideByGuideId.fulfilled, (state, action) => {
                state.isSuccess = true
                state.viewingGuide = action.payload
            })
            .addCase(getGuideByGuideId.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.viewingGuide = {}
            })
    }

})

export const { reset } = guideSlice.actions
export default guideSlice.reducer