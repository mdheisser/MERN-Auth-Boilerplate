import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import InlineError from '../ui/InlineError';
import Loader from '../ui/Loader';
import styles from '../../assets/scss/components/forms/resetPasswordForm.scss';
import helpers from '../../assets/scss/helpers.scss';

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                token: props.token,
                password: '',
                passwordConfirmation: ''
            },
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
            this.props.resetPassword(this.state.data)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch((err) => {
                    this.setState({ errors: err.response.data.errors, loading: false });
                });
        }
    };

    validate = (data) => {
        const errors = {};
        if (!data.password) errors.password = 'Password is required';
        if (data.password !== data.passwordConfirmation) errors.passwordConfirmation = 'Passwords do not match';
        return errors;
    };

    render() {
        const { errors, data, loading } = this.state;

        return (
            <div className={styles['reset-password-form']}>
                <form onSubmit={this.onSubmit}>
                    {loading && <Loader text="Validating..." />}
                    <h1>Create a new password</h1>
                    <input
                        className={errors.password && helpers.error}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                    <input
                        className={errors.passwordConfirmation && helpers.error}
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm password"
                        value={data.passwordConfirmation}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
                    <button className={helpers.button} disabled={loading}>Reset Password</button>
                </form>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    resetPassword: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default connect(null, { resetPassword })(ResetPasswordForm);
