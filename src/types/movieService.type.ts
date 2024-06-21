import {IRes} from "./axiosResp.type";
import {IMovie, IMovieDetails, IPagination, ITrailers} from "../interfaces";

export type MovieService = {
    getAll: (page: number) => IRes<IPagination<IMovie>>,
    searchMovie: (title: string, page: number) => IRes<IPagination<IMovie>>,
    getById: (id: number) => IRes<IMovieDetails>,
    getTrailer: (id: number) => IRes<ITrailers>,
    getAllTV: (page: number) => IRes<IPagination<IMovie>>
}