import * as actionTypes from '../actionTypes';

const initialState = {
    cast: null,
    crew: null,
    loading: true,
    error: null
};

const movieTeam = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_TEAM_REQUEST:
            return {
                cast: null,
                crew: null,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_MOVIE_TEAM_SUCCESS:
            return {
                cast: action.payload.cast,
                crew: action.payload.crew,
                loading: false,
                error: null
            };
        case actionTypes.FETCH_MOVIE_TEAM_FAILURE:
            return {
                cast: null,
                crew: null,
                loading: false,
                error: action.payload
            };
        default: 
            return state;
    }
};

export default movieTeam;