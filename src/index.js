import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import TMDbService from './services/TMDbService';
import { TMDbServiceProvider } from './components/tmdbServiceContext';
import store from './redux/store';

const tmdbService = new TMDbService();

ReactDOM.render(
        <Provider store={store}>
            <TMDbServiceProvider value={tmdbService}>
                <Router>
                    <App />
                </Router>
            </TMDbServiceProvider>
        </Provider>,
    document.getElementById('root')
);