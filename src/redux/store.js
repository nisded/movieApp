import { createStore, combineReducers } from 'redux';

import { movies, movie, movieTeam, genres } from './reducers';

const store = createStore(
    combineReducers({
        movies,
        movie,
        movieTeam,
        genres
    }), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;