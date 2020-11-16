import * as actionTypes from '../actionTypes';

const initialState = {
    list: [],
    loading: true,
    error: null
};

const genres = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_GENRES_REQUEST:
            return {
                list: [],
                loading: true, 
                error: null
            };
        case actionTypes.FETCH_GENRES_SUCCESS:
            return {
                list: action.payload,
                loading: false,
                error: null
            };
        case actionTypes.FETCH_GENRES_FAILURE:
            return {
                list: [], 
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default genres;