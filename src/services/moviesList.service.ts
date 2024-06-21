import {apiService} from "./api.service";
import {urls} from "../configs";
import {MoviesListService} from "../types";

const moviesListService: MoviesListService = {
    getAllPopular: (page: number = 1) => apiService.get(urls.moviesList.popular, {params: {page}}),
    getAllNowPlaying: (page: number = 1) => apiService.get(urls.moviesList.now_playing, {params: {page}}),
    getAllTopRated: (page: number = 1) => apiService.get(urls.moviesList.top_rated, {params: {page}}),
    getAllUpcoming: (page: number = 1) => apiService.get(urls.moviesList.upcoming, {params: {page}})
}

export {moviesListService}