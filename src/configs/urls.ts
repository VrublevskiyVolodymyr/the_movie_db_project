const baseURL = "https://api.themoviedb.org/3";
const access = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTJmOGFmYWRkNWFmMmY1M2ViNjg2NjFjYzc3MjdjOSIsInN1YiI6IjYzZWU3N2VhODhiMTQ4MDBhYjVjYWI5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zMyk0SWJO4OX7ncdSZTSOdA9YJZKfUUJvbiu-K9cRLo';
const imageURL = 'https://image.tmdb.org/t/p/w500/';

const movie = "/movie";
const discover = "/discover/movie";
const genre = "/genre/movie";
const tv = "/discover/tv";


const urls = {
    movies: {
        base: `${discover}?`,
        getById: (id: number): string => `${movie}/${id}`,
        getTrailer: (id: number): string => `${movie}/${id}/videos`,
        search_movie: (title: string): string => `/search/movie?query=${title}`
    },
    tv: {
        base: `${tv}?`
    },
    genres: {
        base: `${genre}/list`,
        byId: (id: number): string => `${discover}?&with_genres=${id}`,
    },
    moviesList: {
        popular: `${movie}/popular`,
        now_playing: `${movie}/now_playing`,
        top_rated: `${movie}/top_rated`,
        upcoming: `${movie}/upcoming`
    }
}

export {baseURL, imageURL, urls, access}