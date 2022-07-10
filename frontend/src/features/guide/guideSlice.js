import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import guideService from './guideService'

const initialState = {
    guides: [],
<<<<<<< HEAD
    viewingGuide: "",
=======
    viewingGuide: {},
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
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

<<<<<<< HEAD
//like guide
export const likeGuide = createAsyncThunk('/guide/likeGuide', async(guideId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await guideService.likeGuide(guideId, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//comment guide
export const commentGuide = createAsyncThunk('/guide/commentGuide', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const { guideId, content } = body

        return await guideService.commentGuide(guideId, content, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

=======
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
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
<<<<<<< HEAD
            .addCase(getGuideByGuideId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuideByGuideId.fulfilled, (state, action) => {
                state.isLoading = false
=======
            .addCase(getGuideByGuideId.fulfilled, (state, action) => {
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
                state.isSuccess = true
                state.viewingGuide = action.payload
            })
            .addCase(getGuideByGuideId.rejected, (state, action) => {
<<<<<<< HEAD
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(likeGuide.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingGuide = action.payload
            })
            .addCase(likeGuide.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(commentGuide.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingGuide = action.payload
            })
            .addCase(commentGuide.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
=======
                state.isError = true
                state.message = action.payload
                state.viewingGuide = {}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
            })
    }

})

export const { reset } = guideSlice.actions
export default guideSlice.reducer