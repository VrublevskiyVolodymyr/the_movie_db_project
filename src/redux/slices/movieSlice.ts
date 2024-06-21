import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre, IMovie, IMovieDetails, IPagination, ITrailers} from "../../interfaces";
import {genreService, movieService} from "../../services";


interface IState {
    movies: IMovie[],
    tv: IMovie[],
    searchMovie: IMovie[],
    selectedMovie: null,
    trailer: ITrailers | null,
    movieById: IMovieDetails | null,
    total_pages: number | null,
    prev: number | null,
    next: number | null,
    loading: boolean,
}

const initialState: IState = {
    movies: [],
    tv: [],
    searchMovie: [],
    selectedMovie: null,
    trailer: null,
    movieById: null,
    total_pages: null,
    prev: null,
    next: null,
    loading: true,
};

const getAll = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getById = createAsyncThunk<IMovieDetails, { id: number }>(
    'movieSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getTrailer = createAsyncThunk<ITrailers, { id: number }>(
    'movieSlice/getTrailer',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTrailer(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const searchMovie = createAsyncThunk<IPagination<IMovie>, { title: string, page: number }>(
    'movieSlice/searchMovie',
    async ({title, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchMovie(title, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getAllByGenres = createAsyncThunk<IPagination<IMovie>, { id: number, page: number }>(
    'movieSlice/getAllByGenres',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAllByGenresId(id, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const getGenres = createAsyncThunk<IGenre[], void>(
    'movieSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getGenres();
            return data.genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);
const getAllTV = createAsyncThunk<IPagination<IMovie>, { page: number }>(
    'movieSlice/getAllTV',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAllTV(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload
        }
    },
    extraReducers: (builder) => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.movies = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })

        .addCase(getById.fulfilled, (state, action) => {
            state.movieById = action.payload
            state.loading = false
        })
        .addCase(getTrailer.fulfilled, (state, action) => {
            state.trailer = action.payload
            state.loading = false
        })
        .addCase(searchMovie.fulfilled, (state, action) => {
            const {results, total_pages, page} = action.payload
            state.searchMovie = results
            state.prev = page - 1
            state.next = page + 1
            state.total_pages = total_pages
            state.loading = false
        })
        .addCase(getAllTV.fulfilled, (state, action) => {
            const {results, page, total_pages} = action.payload
            state.tv = results
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

const {reducer: movieReducer, actions} = movieSlice

const movieActions = {
    ...actions,
    getAll,
    getGenres,
    searchMovie,
    getById,
    getTrailer,
    getAllByGenres,
    getAllTV
}

export {movieReducer, movieActions}