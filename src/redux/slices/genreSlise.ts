import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre, IPagination, IMovie} from "../../interfaces";
import {genreService} from "../../services";

interface IState {
    genres: IGenre[];
    genresById: IMovie[];
    total_pages: number | null;
    prev: number | null;
    next: number | null;
    loading: boolean;
}

const initialState: IState = {
    genres: [],
    genresById: [],
    total_pages: null,
    prev: null,
    next: null,
    loading: true,
};

const getAllByGenres = createAsyncThunk<IPagination<IMovie>, { id: number; page: number }>(
    "genreSlice/getAllByGenres",
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAllByGenresId(id, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getGenres = createAsyncThunk<IGenre[], void>(
    "genreSlice/getGenres",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getGenres();
            return data.genres;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const genreSlice = createSlice({
    name: "genreSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.loading = false;
        })
        .addCase(getAllByGenres.fulfilled, (state, action) => {
            const {results, total_pages, page} = action.payload;
            state.genresById = results;
            state.prev = page - 1;
            state.next = page + 1;
            state.total_pages = total_pages;
            state.loading = false;
        })
        .addDefaultCase((state, actions) => {
            const [actionStatus] = actions.type.split("/").slice(-1);
            state.loading = actionStatus === "pending";
        }),
});

const {reducer: genreReducer, actions} = genreSlice;

const genreActions = {
    ...actions,
    getGenres,
    getAllByGenres,
};

export {genreReducer, genreActions};
