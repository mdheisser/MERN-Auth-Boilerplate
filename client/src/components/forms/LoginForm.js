import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import { login } from '../../actions/auth';
import InlineError from '../ui/InlineError';
import Message from '../ui/Message';
import Loader from '../ui/Loader';
import styles from '../../assets/scss/components/forms/loginForm.scss';
import icons from '../../assets/scss/ionicons.scss';
import message from '../../assets/scss/components/ui/message.scss';
import helpers from '../../assets/scss/helpers.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: ''
            },
            passType: 'password',
            loading: false,
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.login(this.state.data)
                .then(() => {
                    this.props.history.push('/dashboard');
                })
                .catch((err) => {
                    this.setState({ errors: err.response.data.errors, loading: false });
                });
        }
    };

    validate = (data) => {
        const errors = {};

        if (!Validator.isEmail(data.email)) errors.email = 'Email address is invalid';
        if (!data.email) errors.email = 'Email is required';
        if (!data.password) errors.password = 'Password is required';
        return errors;
    };

    passwordType = () => {
        this.setState({
            passType: this.state.passType === 'password' ? 'text' : 'password'
        });
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div className={styles['login-form']}>
                <form onSubmit={this.onSubmit}>
                    <h1>Log in to continue</h1>
                    {loading && <Loader text="Validating..." />}
                    {errors.global && (
                        <Message status={message.negative} icon={icons['ion-android-warning']}>
                            {errors.global}
                        </Message>
                    )}
                    <input
                        className={errors.email && helpers.error}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={data.email}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                    <input
                        className={errors.password && helpers.error}
                        type={this.state.passType}
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                    <div className={styles['login-form-btm']}>
                        <div className={styles.remember}>
                            <input type="checkbox" name="remember" />
                            <span className={styles['remember-text']}>Remember me</span>
                        </div>
                        <button type="button" className={styles['show-pass']} onClick={() => this.passwordType()}>
                            {this.state.passType === 'password' ? 'Show' : 'Hide' } password
                        </button>
                    </div>
                    <button type="submit" disabled={loading} className={helpers.button}>Login</button>
                    <div className={styles['forgot-password']}><Link to="/forgot_password">Forgot password</Link></div>
                    <div className={helpers['line-spacer']} />
                    <div className={styles.callout}>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></div>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginForm);
