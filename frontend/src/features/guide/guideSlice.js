import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import guideService from './guideService'

const initialState = {
    guides: [],
    userGuides: [],
    viewingGuide: "",
    createdGuide: "",
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

//create guide
export const createGuide = createAsyncThunk('/guide/createGuide', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        
        return await guideService.createGuide(body, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get guides by user id
export const getGuidesByUserId = createAsyncThunk('/guide/getGuidesByUserId', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await guideService.getGuidesByUserId(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//edit guide by guide id
export const editGuide = createAsyncThunk('/guide/editGuide', async(body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        const id = body.id

        const editDetails = {
            content: body.content
        }
        
        return await guideService.editGuide(id, editDetails, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//delete guide by guide id
export const deleteGuide = createAsyncThunk('/guide/deleteGuide', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await guideService.deleteGuide(id, token)

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
            .addCase(getGuideByGuideId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuideByGuideId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewingGuide = action.payload
            })
            .addCase(getGuideByGuideId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.viewingGuide = null
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
            })
            .addCase(createGuide.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGuide.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.createdGuide = action.payload
            })
            .addCase(createGuide.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.createdGuide = ""
            })
            .addCase(getGuidesByUserId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuidesByUserId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userGuides = action.payload
            })
            .addCase(getGuidesByUserId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.userGuides = []
            })
            .addCase(editGuide.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editGuide.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(editGuide.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGuide.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGuide.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(deleteGuide.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }

})

export const { reset } = guideSlice.actions
export default guideSlice.reducer