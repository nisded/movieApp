export default class TMDbService {
    constructor() {
        this._API_BASE = 'https://api.themoviedb.org/3/';
        this._API_KEY = 'eae1a17c8e7628d3e645348654ad8745';
        this._API_IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

        this.getResourse = this.getResourse.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.getPopularMovies = this.getPopularMovies.bind(this);
        this.getGenres = this.getGenres.bind(this);
        this.getImageUrl = this.getImageUrl.bind(this);
        this.getMovieTeam = this.getMovieTeam.bind(this);
    }

    async getResourse(url, queryParams = '') {
        const result = await fetch(`${this._API_BASE}${url}?api_key=${this._API_KEY}&language=en-US${queryParams}`);
        if (!result.ok)
            throw new Error(`Could not fetch ${url}, receives ${result.status}`);
        return await result.json();
    }

    async getMovie(movieId) {
        const movie = await this.getResourse(`movie/${movieId}`);
        return movie;
    }

    async getPopularMovies(page = 1){
        const queryParams = `&page=${page}`;
        const movies = await this.getResourse(`movie/popular`, queryParams);
        return { 
            movies: movies.results,
            totalPages: movies.total_pages
        };
    }

    async getGenres(){
        const genres = await this.getResourse(`genre/movie/list`);
        return genres.genres;
    }

    getImageUrl(path){
        return `${this._API_IMAGE_BASE}${path}`;
    }

    // get movie cast and crew
    async getMovieTeam(movieId){
        const team = await this.getResourse(`movie/${movieId}/credits`);
        return team;
    }
}