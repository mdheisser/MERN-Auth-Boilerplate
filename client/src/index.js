import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { USER_LOGGED_IN } from './actions/auth';
import './assets/scss/main.scss';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.authToken) {
    // Set the authorization bearer header
    setAuthorizationToken(localStorage.authToken);

    // Dispatch login action
    const payload = decode(localStorage.authToken);
    const user = {
        token: localStorage.authToken,
        email: payload.email,
        confirmed: payload.confirmed
    };

    store.dispatch({
        type: USER_LOGGED_IN,
        user
    });
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
