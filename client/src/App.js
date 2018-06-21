import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './components/hocs/AuthRoute';
import UserRoute from './components/hocs/UserRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const App = ({ location }) => (
    <div>
        <Switch>
            <Route location={location} path="/" exact component={Home} />
            <UserRoute location={location} path="/login" exact component={Login} />
            <UserRoute location={location} path="/signup" exact component={Signup} />
            <UserRoute location={location} path="/forgot_password" exact component={ForgotPassword} />
            <UserRoute location={location} path="/reset_password" exact component={ResetPassword} />
            <Route location={location} path="/confirmation" exact component={Confirmation} />
            <AuthRoute location={location} path="/dashboard" exact component={Dashboard} />
            <Route path="*" component={NotFound} />
        </Switch>
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
