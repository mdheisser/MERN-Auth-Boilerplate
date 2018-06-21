import axios from 'axios';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const login = data => dispatch =>
    axios.post('/api/auth/login', { data })
        .then((res) => {
            localStorage.authToken = res.data.user.token;
            dispatch({
                type: USER_LOGGED_IN,
                user: res.data.user
            });
        });

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({
        type: USER_LOGGED_OUT
    });
};

export const signup = data => dispatch =>
    axios.post('/api/auth/signup', { data })
        .then((res) => {
            localStorage.authToken = res.data.user.token;
            dispatch({
                type: USER_LOGGED_IN,
                user: res.data.user
            });
        });

export const confirmAccount = token => dispatch =>
    axios.post('/api/auth/confirmation', { token })
        .then((res) => {
            localStorage.authToken = res.data.user.token;
            dispatch({
                type: USER_LOGGED_IN,
                user: res.data.user
            });
        });

export const resetPasswordRequest = ({ email }) => () =>
    axios.post('/api/auth/reset_password_request', { email });

export const validateToken = token => () =>
    axios.post('/api/auth/validate_token', { token });

export const resetPassword = data => () =>
    axios.post('/api/auth/reset_password', { data });
