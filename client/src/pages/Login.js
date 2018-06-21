import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../components/global/AppHeader';
import LoginForm from '../components/forms/LoginForm';

const Login = props => (
    <div>
        <AppHeader />
        <LoginForm history={props.history} />
    </div>
);

Login.propTypes = {
    history: PropTypes.shape({})
};

export default Login;
