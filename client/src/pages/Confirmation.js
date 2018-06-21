import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { confirmAccount } from '../actions/auth';
import Loader from '../components/ui/Loader';
import styles from '../assets/scss/pages/confirmation.scss';
import helpers from '../assets/scss/helpers.scss';

class Confirmation extends React.Component {
    state = {
        loading: true,
        success: false
    };

    componentDidMount() {
        const { token } = queryString.parse(window.location.search);
        this.props.confirmAccount(token)
            .then(() => {
                this.setState({ loading: false, success: true });
            })
            .catch(() => {
                this.setState({ loading: false, success: false });
            });
    }

    render() {
        const { loading, success } = this.state;

        return (
            <div>
                {loading && <Loader text="Validating..." />}
                {!loading && success &&
                    <div className={helpers['center-screen']}>
                        <div className={styles['general-message']}>
                            <h3 className={styles['message-title']}>Thank-you. Your account has been verified.</h3>
                            <Link to="/dashboard">Go to your dashboard</Link>
                        </div>
                    </div>
                }
                {!loading && !success &&
                    <div className={helpers['center-screen']}>
                        <div className={styles['general-message']}>
                            <h3 className={styles['message-title']}>Ooops, invalid token.</h3>
                            <Link to="/">Go back home</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Confirmation.propTypes = {
    confirmAccount: PropTypes.func.isRequired
};

export default connect(null, { confirmAccount })(Confirmation);
