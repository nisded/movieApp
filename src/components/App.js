import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';
import Header from '../components/Header';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path="/" component={MovieList} />
                    <Route exact path="/page/:num" component={MovieList} />
                    <Route path="/movie/:id" render={({match}) => <MovieDetails movieId={match.params.id} />} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;