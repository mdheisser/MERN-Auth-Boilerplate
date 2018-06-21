import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ auth, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => !auth ? <Component {...props} /> : <Redirect to="/dashboard" />}
    />
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        auth: !!state.auth.token
    };
}

export default connect(mapStateToProps)(UserRoute);
