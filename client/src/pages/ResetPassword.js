import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { validateToken } from '../actions/auth';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import AppHeader from '../components/global/AppHeader';
import styles from '../assets/scss/pages/resetPassword.scss';
import bootstrap from '../assets/scss/bootstrap.scss';
import message from '../assets/scss/components/ui/message.scss';
import icons from '../assets/scss/ionicons.scss';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            success: false
        };
    }

    componentDidMount = () => {
        const { token } = queryString.parse(window.location.search);
        this.props.validateToken(token)
            .then(() => {
                console.log('Token valid');
                this.setState({ loading: false, success: true });
            })
            .catch(() => {
                console.log('Token invalid');
                this.setState({ loading: false, success: false });
            });
    };

    render() {
        const { loading, success } = this.state;
        const { token } = queryString.parse(window.location.search);

        return (
            <div>
                <AppHeader />
                <div className={styles['reset-password-page']}>
                    <div className={bootstrap.container}>
                        {loading && <Loader text="Loading..." />}
                        {!loading && success && <ResetPasswordForm history={this.props.history} token={token} />}
                        {!loading && !success && <Message status={message.negative} icon={icons['ion-android-warning']}>Invalid token</Message>}
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    history: PropTypes.shape({}).isRequired,
    validateToken: PropTypes.func.isRequired
};

export default connect(null, { validateToken })(ResetPassword);
