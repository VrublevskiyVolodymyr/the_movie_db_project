import {IRes} from "./axiosResp.type";
import {IListGenre, IMovie, IPagination} from "../interfaces";

export type GenreService = {
    getAllByGenresId: (id: number, page: number) => IRes<IPagination<IMovie>>,
    getGenres: () => IRes<IListGenre>
}