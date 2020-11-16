import * as actionTypes from './actionTypes';

// movie list
const moviesRequested = (page = 1) => {
    return {
        type: actionTypes.FETCH_MOVIES_REQUEST,
        payload: page
    };
};

const moviesLoaded = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        payload: movies
    };
};

const moviesFetchError = (error) => {
    return {
        type: actionTypes.FETCH_MOVIES_FAILURE,
        payload: error
    };
};

// ----------------------------------------------------- //

// movie
const movieRequested = () => {
    return {
        type: actionTypes.FETCH_MOVIE_REQUEST
    };
};

const movieLoaded = (movie) => {
    return {
        type: actionTypes.FETCH_MOVIE_SUCCESS,
        payload: movie
    };
};

const movieFetchError = (error) => {
    return {
        type: actionTypes.FETCH_MOVIE_FAILURE,
        payload: error
    };
};

// ----------------------------------------------------- //

// genres
const genresRequested = () => {
    return {
        type: actionTypes.FETCH_GENRES_REQUEST
    };
};

const genresLoaded = (genres) => {
    return {
        type: actionTypes.FETCH_GENRES_SUCCESS,
        payload: genres
    };
};

const genresFetchError = (error) => {
    return {
        type: actionTypes.FETCH_GENRES_FAILURE,
        payload: error
    };
};

// ----------------------------------------------------- //

// movie team
const movieTeamRequested = () => ({
    type: actionTypes.FETCH_MOVIE_TEAM_REQUEST
});

const movieTeamLoaded = movieTeam => ({
    type: actionTypes.FETCH_MOVIE_TEAM_SUCCESS,
    payload: movieTeam
});

const movieTeamFetchError = error => ({
    type: actionTypes.FETCH_MOVIE_TEAM_FAILURE,
    payload: error
});

// ----------------------------------------------------- //

export {
    moviesRequested,
    moviesLoaded,
    moviesFetchError,
    movieRequested,
    movieLoaded,
    movieFetchError,
    genresRequested,
    genresLoaded,
    genresFetchError,
    movieTeamRequested,
    movieTeamLoaded,
    movieTeamFetchError
};