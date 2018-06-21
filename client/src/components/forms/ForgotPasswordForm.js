import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { resetPasswordRequest } from '../../actions/auth';
import InlineError from '../ui/InlineError';
import Message from '../ui/Message';
import Loader from '../ui/Loader';
import styles from '../../assets/scss/components/forms/forgotPasswordForm.scss';
import helpers from '../../assets/scss/helpers.scss';
import message from '../../assets/scss/components/ui/message.scss';
import icons from '../../assets/scss/ionicons.scss';

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: ''
            },
            success: false,
            loading: false,
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.resetPasswordRequest(this.state.data)
                .then(() => {
                    this.setState({ success: true });
                })
                .catch((err) => {
                    this.setState({ errors: err.response.data.errors, loading: false });
                });
        }
    };

    validate = (data) => {
        const errors = {};
        if (!isEmail(data.email)) errors.email = 'Invalid email address';
        return errors;
    };

    render() {
        const { errors, data, success, loading } = this.state;

        return (
            <div className={styles['forgot-password-form']}>
                {success ? (
                    <Message status={message.positive} icon={icons['ion-android-checkmark-circle']}>
                        A reset password email has been sent.
                    </Message>
                ) : (
                    <form onSubmit={this.onSubmit}>
                        {loading && <Loader text="Validating..." />}
                        {!!errors.global &&
                            <Message status={message.negative} icon={icons['ion-android-warning']}>
                                {errors.global}
                            </Message>
                        }
                        <h1>Reset Password</h1>
                        <div className={styles.subtitle}>Enter the email address associated with your account, we&apos;ll email you a link to reset your password.</div>
                        <input
                            className={errors.email && helpers.error}
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={data.email}
                            onChange={e => this.onChange(e)}
                        />
                        {errors.email && <InlineError text={errors.email} />}
                        <div className={styles['forgot-pass-bottom']}>
                            <Link to="/login">
                                <i className={icons['ion-ios-arrow-left']} />
                                <span>Back to Login</span>
                            </Link>
                            <button className={`${helpers.inline} ${helpers.button}`}>Send Reset Link</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordForm);
