import {apiService} from "./api.service";
import {urls} from "../configs";
import {GenreService} from "../types";

const genreService: GenreService = {
    getAllByGenresId: (id: number, page = 1) => apiService.get(urls.genres.byId(id), {params: {page}}),
    getGenres: () => apiService.get(urls.genres.base)
}

export {genreService}