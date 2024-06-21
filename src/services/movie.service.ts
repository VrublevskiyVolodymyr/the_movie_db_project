import {apiService} from './api.service'
import {urls} from "../configs";
import {MovieService} from "../types";

const movieService: MovieService = {
    getAll: (page: number = 1) => apiService.get(urls.movies.base, {params: {page}}),
    searchMovie: (title: string, page: number = 1) => apiService.get(urls.movies.search_movie(title), {params: {page}}),
    getById: (id) => apiService.get(urls.movies.getById(id)),
    getTrailer: (id) => apiService.get(urls.movies.getTrailer(id)),
    getAllTV: (page: number = 1) => apiService.get(urls.tv.base, {params: {page}})
}

export {movieService}