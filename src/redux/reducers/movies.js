import * as actionTypes from '../actionTypes';

const initialState = {
    list: [],
    currentPage: 1,
    totalPages: 0,
    loading: true,
    error: null
};

const movies = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_MOVIES_REQUEST:
            return {
                list: [],
                currentPage: action.payload,
                loading: true, 
                error: null
            };
        case actionTypes.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                list: action.payload.movies,
                totalPages: action.payload.totalPages,
                loading: false,
                error: null
            };
        case actionTypes.FETCH_MOVIES_FAILURE:
            return {
                list: [], 
                currentPage: 1,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default movies;