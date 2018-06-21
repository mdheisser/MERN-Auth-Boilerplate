import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../components/forms/SignupForm';
import AppHeader from '../components/global/AppHeader';

const Signup = props => (
    <div>
        <AppHeader />
        <SignupForm history={props.history} />
    </div>
);

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default Signup;
