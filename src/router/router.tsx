import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "../layouts";
import {ErrorPage, HomePage, MovieCardPage, MoviesListPage, SearchByGenrePage, SearchPage, TvPage} from "../pages";


const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>,
        children: [
            {
                index: true, element: <Navigate to={'home'}/>
            },
            {
                path: 'home/?', element: <HomePage/>
            },
            {
                path: 'home/:list/:id', element: <MovieCardPage/>
            },
            {
                path: 'movies', element: <MoviesListPage/>
            },
            {
                path: 'tv', element: <TvPage/>
            },
            {
                path: 'tv/:id', element: <MovieCardPage/>
            },
            {
                path: 'movies_card', element: <MovieCardPage/>
            },
            {
                path: 'movies/:id', element: <MovieCardPage/>
            },
            {
                path: 'search_movie/:title', element: <SearchPage/>
            },
            {
                path: 'search_movie_by_genre/:idGenre/:nameGenre', element: <SearchByGenrePage/>
            },
            {
                path: 'search_movie_by_genre/:idGenre/:nameGenre/:id', element: <MovieCardPage/>
            }

        ],
        errorElement: <ErrorPage/>
    }
])

export {
    router
}