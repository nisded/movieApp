import * as actionTypes from '../actionTypes';

const initialState = {
    movie: null,
    loading: true,
    error: null
};

const movie = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_REQUEST:
            return {
                movie: null,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_MOVIE_SUCCESS:
            return {
                movie: action.payload,
                loading: false,
                error: null
            };
        case actionTypes.FETCH_MOVIE_FAILURE:
            return {
                movie: null,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default movie;