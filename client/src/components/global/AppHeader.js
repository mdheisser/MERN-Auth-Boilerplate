import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import styles from '../../assets/scss/components/global/appHeader.scss';
import bootstrap from '../../assets/scss/bootstrap.scss';

const AppHeader = props => (
    <div className={styles['header-wrap']}>
        <div className={bootstrap.container}>
            <div className={styles.header}>
                <div className={styles.logo}>boilerplate</div>
                <div className={styles.navigation}>
                    <Link to="/">Home</Link>
                    {props.auth ? (
                        <div className={styles['user-links']}>
                            <Link to="/dashboard">Dashboard</Link>
                            <button onClick={() => props.logout()}>Logout</button>
                        </div>
                    ) : (
                        <div className={styles['user-links']}>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

AppHeader.propTypes = {
    auth: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: !!state.auth.token
    };
}

export default connect(mapStateToProps, { logout })(AppHeader);
