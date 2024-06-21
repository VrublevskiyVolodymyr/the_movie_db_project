import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IPagination} from "../../interfaces";
import {moviesListService} from "../../services";


interface IState {
    popular: IMovie[],
    now_playing: IMovie[],
    top_rated: IMovie[],
    upcoming: IMovie[],
    total_pages: number | null,
    prev: number | null,
    next: number | null,
    loading: boolean,
}

const initialState: IState = {
    popular: [],
    now_playing: [],
    top_rated: [],
    upcoming: [],
    total_pages: null,
    prev: null,
    next: null,
    loading: true,
};

const getAllPopular = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAllPopular',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesListService.getAllPopular(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getAllNowPlaying = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAllNowPlaying',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesListService.getAllNowPlaying(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getAllTopRated = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAllTopRated',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesListService.getAllTopRated(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getAllUpcoming = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAllUpcoming',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesListService.getAllUpcoming(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);


const moviesListSlice = createSlice({
    name: 'moviesListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getAllPopular.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.popular = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })

        .addCase(getAllNowPlaying.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.now_playing = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })

        .addCase(getAllTopRated.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.top_rated = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })

        .addCase(getAllUpcoming.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.upcoming = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })

        .addDefaultCase((state, actions) => {
            const [actionStatus] = actions.type.split('/').slice(-1);
            state.loading = actionStatus === 'pending';
        })
});

const {reducer: moviesListReducer, actions} = moviesListSlice

const moviesListActions = {
    ...actions,
    getAllPopular,
    getAllNowPlaying,
    getAllTopRated,
    getAllUpcoming
}

export {moviesListReducer, moviesListActions}