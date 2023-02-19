const API_KEY = "03e63f4a6113b7712273d43c6c0662bf";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "ko";
const DATE = "2022-06-01";
const RATE = 9;

export interface IGenre {
    id: number;
    name: string;
}

export interface IGenreResult {
    genres: IGenre[];
}

export interface INetFlix {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    overview: string;
    vote_average: number;
    genre_ids: [];
}

export interface IGetNetFlixResult {
    dates: {
        maximun: string;
        minimum: string;
    };
    page: number;
    results: INetFlix[];
    total_pages: number;
    total_results: number;
}

// 영화
export function getKoreaMoviess(){
    return fetch(`${BASE_PATH}/discover/movie/?api_key=${API_KEY}&language=${LANGUAGE}&with_original_language=${LANGUAGE}&sort_by=popularity.desc&include_adult=false&vote_count.gte=${RATE}&primary_release_date.gte=${DATE}`).then(res => res.json());
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getLatiestMovies(){
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getTopMovies(){
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getUpCommingMovies(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getGenreMovies(){
    return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getSearchMovies(search:string){
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${search}&language=${LANGUAGE}`).then(res => res.json());
}

// TV
export function getKoreaTvs(){
    return fetch(`${BASE_PATH}/discover/tv/?api_key=${API_KEY}&language=${LANGUAGE}&with_original_language=${LANGUAGE}&sort_by=popularity.desc&include_adult=false&vote_count.gte=${RATE}&primary_release_date.gte=${DATE}`).then(res => res.json());
}

export function getPopularTvs(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getAiringTvs(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getTopTvs(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

export function getSearchTvs(search:string){
    return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${search}&language=${LANGUAGE}`).then(res => res.json());
}

export function getGenreTvs(){
    return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE}`).then(res => res.json());
}

// 동영상 가져오기
export function getVideo(cat:string, movieId: number){
    return fetch(`${BASE_PATH}/${cat}/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`).then(res => res.json());
}