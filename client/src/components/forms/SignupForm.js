import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { signup } from '../../actions/auth';
import InlineError from '../ui/InlineError';
import Loader from '../ui/Loader';
import styles from '../../assets/scss/components/forms/signupForm.scss';
import helpers from '../../assets/scss/helpers.scss';
import icons from '../../assets/scss/ionicons.scss';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                emailoptin: true
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
            this.props.signup(this.state.data)
                .then(() => {
                    this.props.history.push('/dashboard');
                })
                .catch((err) => {
                    this.setState({ errors: err.response.data.errors, loading: false });
                });
        }
    };

    checkboxChange = (e) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: !this.state.data.emailoptin }
        });
    };

    validate = (data) => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = 'Enter a valid email';
        if (!data.email) errors.email = 'Email is required';
        if (!data.firstName) errors.firstName = 'First name is required';
        if (!data.lastName) errors.lastName = 'Last name is required';
        if (!data.password) errors.password = 'Password is required';

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div className={styles['signup-form']}>
                <form onSubmit={this.onSubmit}>
                    {loading && <Loader text="Validating..." />}
                    <h1>Create an account</h1>
                    <input
                        className={errors.email && helpers.error}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={data.email}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                    <input
                        className={errors.firstName && helpers.error}
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={data.firstName}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.firstName && <InlineError text={errors.firstName} />}
                    <input
                        className={errors.lastName && helpers.error}
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={data.lastName}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.lastName && <InlineError text={errors.lastName} />}
                    <input
                        className={errors.password && helpers.error}
                        type="password"
                        name="password"
                        placeholder="Create a Password"
                        value={data.password}
                        onChange={e => this.onChange(e)}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                    <div className={styles['agree-terms']}>
                        <input
                            type="checkbox"
                            name="emailoptin"
                            value={data.emailoptin}
                            onChange={() => this.checkboxChange()}
                            defaultChecked={data.emailoptin}
                        />
                        <span>I&apos;d like to receive helpful communication & marketing emails.</span>
                    </div>
                    <button className={helpers.button} type="submit">Sign Up</button>
                    <div className={styles.agree}>
                        <i className={icons['ion-android-bulb']} />
                        <span>By clicking Sign up, I agree to the&apos;s <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>.</span>
                    </div>
                    <div className={helpers['line-spacer']} />
                    <div className={styles.callout}>Already have an account? <Link to="/login">Log in</Link></div>
                </form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupForm);
