import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import './MovieList.css';
import MovieListItem from '../MovieListItem';
import Spinner from '../Spinner';
import { withTMDbService } from '../hoc';
import { moviesRequested, moviesLoaded, moviesFetchError } from '../../redux/actionCreators';

const MovieListView = ({ movies, getMovieImage }) => {
    return (
        <div className="row">
            {
                movies.map((movie) => {
                    const movieImage = getMovieImage(movie.poster_path);
                    
                    return (
                        <MovieListItem movie={movie} movieImage={movieImage} key={movie.id} />
                    );
                })
            }
        </div>
    );
};

class MovieListContainer extends React.Component {
    componentDidMount() {
        const { tmdbService, currentPage } = this.props;

        //fetch movies
        tmdbService.getPopularMovies(currentPage)
            .then(result => this.props.moviesLoaded(result))
            .catch(error => this.props.moviesFetchError(error));
    }

    componentDidUpdate(prevProps) {        
        if (prevProps !== this.props){
            const { tmdbService, currentPage, moviesRequested, 
                moviesLoaded, moviesFetchError, location, match } = this.props;

            if (prevProps.currentPage !== currentPage)
                tmdbService.getPopularMovies(currentPage)
                    .then(result => moviesLoaded(result))
                    .catch(error => moviesFetchError(error));
            
            if (prevProps.location.pathname !== location.pathname && prevProps.currentPage === currentPage){   
                const prevPage = match.params.num;
                if (prevPage)
                    moviesRequested(prevPage);
                else
                    moviesRequested();
            }   
        }             
    }

    handlePageClick = (data) => {
        const page = data.selected + 1;
        if (page !== this.props.currentPage)
            this.props.moviesRequested(page);

        this.props.history.push(`/page/${page}`);
    }

    render() {
        const { movies, moviesLoading, moviesError, currentPage, totalPages, tmdbService } = this.props;
        if (moviesLoading)
            return <Spinner />;
        if (moviesError)
            return <div>Something has gone wrong...</div>;

        return (
            <React.Fragment>
                <MovieListView movies={movies} getMovieImage={tmdbService.getImageUrl} />
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    forcePage={currentPage - 1}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={7}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    activeLinkClassName={'active-btn'}
                />
            </React.Fragment> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.list,
        currentPage: state.movies.currentPage,
        totalPages: state.movies.totalPages,
        moviesLoading: state.movies.loading,
        moviesError: state.movies.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        moviesRequested: (page) => dispatch(moviesRequested(page)),
        moviesLoaded: (movies) => dispatch(moviesLoaded(movies)),
        moviesFetchError: (error) => dispatch(moviesFetchError(error)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTMDbService(MovieListContainer));