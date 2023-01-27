import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const getData = createAsyncThunk('gets/getData', async () => {
    return Axios.get('http://localhost:8000/data').then(res => { return res.data })
        .then(json => json.sort((a, b) => a.app_name.localeCompare(b.app_name)))
})

const taskSlice = createSlice({
    name: "taskList",
    initialState: {
        taskList: [],
        loading: false
    },
    extraReducers: {
        [getData.pending]: (state, action) => {
            state.loading = true;
        },
        [getData.fulfilled]: (state, action) => {
            state.loading = false;
            state.taskList = action.payload;
        },
        [getData.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})

export default taskSlice.reducer;