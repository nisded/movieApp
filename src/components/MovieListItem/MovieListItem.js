import React from 'react';
import { Link } from 'react-router-dom';

import './MovieListItem.css';

const MovieListItem = ({ movie, movieImage }) => {
    return (
        <div className="movie">
            <Link to={`/movie/${movie.id}`}>
                <div className="movie__image-container">
                    <img src={movieImage} alt={movie.title} className="movie__image-container__img" />
                    <div className="movie__image-container__rating badge badge-success">
                        {movie.vote_average}
                    </div>
                </div>
                <div className="movie__title">
                    {movie.title}
                </div>
            </Link>
        </div>

    );
};

export default MovieListItem;