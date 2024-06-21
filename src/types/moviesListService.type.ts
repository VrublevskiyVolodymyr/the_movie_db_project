import {IRes} from "./axiosResp.type";
import {IMovie, IPagination} from "../interfaces";

export type MoviesListService = {
    getAllPopular: (page: number) => IRes<IPagination<IMovie>>,
    getAllNowPlaying: (page: number) => IRes<IPagination<IMovie>>,
    getAllTopRated: (page: number) => IRes<IPagination<IMovie>>,
    getAllUpcoming: (page: number) => IRes<IPagination<IMovie>>,
}