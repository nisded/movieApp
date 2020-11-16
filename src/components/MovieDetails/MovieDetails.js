import React from 'react';
import { connect } from 'react-redux';

import './MovieDetails.css';

import Spinner from '../Spinner';
import { withTMDbService } from '../hoc';
import { 
    movieRequested, movieLoaded, movieFetchError,
    movieTeamRequested, movieTeamLoaded, movieTeamFetchError
} from '../../redux/actionCreators';


class MovieDetails extends React.Component {
    componentDidMount(){
        const { tmdbService, movieId, movieRequested, movieLoaded, movieFetchError,
            movieTeamRequested, movieTeamLoaded, movieTeamFetchError } = this.props;
        
        // fetch movie details
        movieRequested();
        tmdbService.getMovie(movieId)
            .then(movie => movieLoaded(movie))
            .catch(error => movieFetchError(error));
        
        // fetch movie team
        movieTeamRequested();
        tmdbService.getMovieTeam(movieId)
            .then(movieTeam => movieTeamLoaded(movieTeam))
            .catch(error => movieTeamFetchError(error));
    }

    render(){
        const { movie, movieLoading, movieError, tmdbService, 
            movieCast, movieTeamLoading, movieTeamError } = this.props;

        if (movieLoading && movieTeamLoading)
            return <Spinner />;

        let movieInfoView = null, movieCastView = null;

        if (movieLoading)
            movieInfoView = <Spinner />;
        else if (movieError)
            movieInfoView = <div>Something has gone wrong...</div>;
        else 
            movieInfoView = <MovieInfoView movie={movie} movieImg={tmdbService.getImageUrl(movie.poster_path)} />

        if (movieTeamLoading)
            movieCastView = <Spinner />;
        else if (movieTeamError)
            movieCastView = <div>Something has gone wrong...</div>;
        else 
            movieCastView = <MovieCastView movieCast={movieCast} getActorPhoto={tmdbService.getImageUrl} />

        return (
            <React.Fragment>
                {movieInfoView}
                {movieCastView}
            </React.Fragment>
        );
    }
};

const MovieInfoView = ({ movie, movieImg }) => {
    const genres = movie.genres.map(genre => {
        return (
            <span className="mr-3" key={genre.id}>
                {genre.name}
            </span>
        );
    });
    
    return (
        <div className="movie-details">
            <div className="movie-details__image">
                <img src={movieImg} alt={movie.title} />
            </div>
            <div className="movie-details__info">
                <div className="movie-details__info__title">
                    <div className="movie-details__info__title__name">
                        {movie.title}
                    </div>
                    <div className="movie-details__info__title__rating badge badge-success">
                        {movie.vote_average}
                    </div>
                </div>
                <div className="movie-details__info__overview">
                    {movie.overview}
                </div>
                <div className="movie-details__info__release">
                    <div className="bold">RELEASE DATE</div>
                    {movie.release_date}
                </div>
                <div className="movie-details__info__runtime">
                    <div className="bold">DURATION</div>
                    {`${Math.trunc(movie.runtime / 60)} h ${movie.runtime % 60} min`}
                </div>
                <div className="movie-details__info__genres">
                    <div className="bold">
                        GENRES
                    </div>
                    <div>
                        {genres}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MovieCastView = ({ movieCast, getActorPhoto }) => {
    const actors = movieCast.slice(0, 15).map(({ cast_id, character, name, profile_path }) => {
        const actorPhoto = getActorPhoto(profile_path);

        return (
            <div className="movie-cast__actor" key={cast_id}>
                <div className="movie-cast__actor__photo">
                    <img className="movie-cast__actor__photo__img" src={actorPhoto} alt={name} />
                </div>
                <div className="movie-cast__actor__about">
                    <div className="movie-cast__actor__name">{name}</div>
                    <div className="movie-cast__actor__character">{character}</div>
                </div>
            </div>
        );
    });

    return (
        <div className="movie-cast">
            <h3 className="movie-cast__header">Actors</h3>
            <div className="movie-cast__actors">
                {actors}
            </div>
        </div>
    );
};

const mapStateToProps = ({ movie, movieTeam }) => {
    return {
        movie: movie.movie,
        movieLoading: movie.loading,
        movieError: movie.error,
        movieCast: movieTeam.cast,
        movieTeamLoading: movieTeam.loading,
        movieTeamError: movieTeam.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        movieRequested: () => dispatch(movieRequested()),
        movieLoaded: (movie) => dispatch(movieLoaded(movie)),
        movieFetchError: (error) => dispatch(movieFetchError(error)),
        movieTeamRequested: () => dispatch(movieTeamRequested()), 
        movieTeamLoaded: (movieTeam) => dispatch(movieTeamLoaded(movieTeam)), 
        movieTeamFetchError: (error) => dispatch(movieTeamFetchError(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTMDbService(MovieDetails));