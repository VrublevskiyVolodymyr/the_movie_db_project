import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {genreReducer, movieReducer, moviesListReducer} from "./slices";


const rootReducer = combineReducers({
    movies: movieReducer,
    genres: genreReducer,
    movieLists: moviesListReducer
});
const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}