import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    TOKEN_REFRESH_SUCCESS,
    TOKEN_REFRESH_FAIL,
    LOGOUT_SUCCESS,
    CHANGE_STAFF_PASSWORD_START,
    CHANGE_STAFF_PASSWORD_SUCCESS,
    CHANGE_STAFF_PASSWORD_FAIL,
    VERIFY_TOKEN_START,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAIL,
} from '../actions/actionTypes';
import axios from 'axios';

import { saveUserDetails } from './users'

import SecureLS from 'secure-ls';

import {apiDev as apiURL} from '../../environment'


//encryption for local storage
const ls = new SecureLS({
    encodingType: 'aes'
})
export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId, role, details) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        role: role,
        details: details
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

//authenticates the user based on the username and password - if authenticated user is signed in, tokens and auth information set in local storage
//sign in for user
export const auth = (authData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${apiURL}/api/users/signIn`, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                ls.set('token', response.data.accessToken)
                ls.set('expirationDate', expirationDate)
                ls.set('userId', response.data.userId)
                ls.set('refreshToken', response.data.refreshToken);
                ls.set('role', response.data.role);
                dispatch(authSuccess(response.data.accessToken, response.data.userId, response.data.role, response.data.details));
                dispatch(saveUserDetails(response.data.details))
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail("Incorrect username or password"));
            });
    };
};

//sets a timeout based on the expiration time - upon timeout, dispatches refresh action
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(refresh());
        }, expirationTime * 1000);
    };
};

//logs the user out of the system - clears everything from localstorage
//dispatches success action if successful
export const logout = () => {
    ls.remove('token');
    ls.remove('expirationDate');
    ls.remove('userId');
    return dispatch => {
        axios.put(`${apiURL}/api/users/logout`)
            .then(response => {
                dispatch(logoutSuccess())
            })
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}


export const refreshSuccess = (token) => {
    return {
        type: TOKEN_REFRESH_SUCCESS,
        idToken: token
    };
};

export const refreshFail = (error) => {
    return {
        type: TOKEN_REFRESH_FAIL,
        error: error
    };
};

//refreshes the token - sends the refresh token, to get back a new access token from the API
//removes token and expiration date from local storage and re adds it upon successful refresh
//dispatches success or fail actions depending on the response
export const refresh = () => {
    const refreshData = {
        token: ls.get('refreshToken')
    }
    return dispatch => {
        if (ls.get('token')) {
            ls.remove('token');
            ls.remove('expirationDate');
            axios.put(`${apiURL}/api/users/refreshToken`, refreshData)
                .then(response => {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); //calculates expiration date based on token expiration time
                    ls.set('token', response.data.accessToken)
                    ls.set('expirationDate', expirationDate)
                    dispatch(refreshSuccess(response.data.accessToken));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err => {
                    dispatch(refreshFail("error"));
                });
        }
    }
};


//checks the state of auth - everytime the page refreshes
//dispatches start and depending on the response, success or fail actions
export const authCheckState = () => {
    return dispatch => {
        let token = window.location.search.substring(6) //retrieves the token from the URL - check if not changing password
        if (!token) {
            token = ls.get('token') //retrieves the token from localstorage
            if (!token) {
                dispatch(logout()); //if no token - logout
            }
            else {
                const expirationDate = new Date(ls.get('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(refresh()); //if expired - refresh token
                }
                else {
                    const userId = ls.get('userId');
                    const role = ls.get('role')
                    const fullname = ls.get('fullname')
                    dispatch(authSuccess(token, userId, role, fullname));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); //re calls the timeout
                }
            }
        }
    };
};

export const changePasswordStart = () => {
    return {
        type: CHANGE_STAFF_PASSWORD_START
    };
};

export const changePasswordSuccess = () => {
    return {
        type: CHANGE_STAFF_PASSWORD_SUCCESS
    };
};

export const changePasswordFail = (error) => {
    return {
        type: CHANGE_STAFF_PASSWORD_FAIL,
        error: error
    };
};

//changes the password of the user
//dispatches start and depending on the response, success or fail actions
export const changePassword = (email, password, confirmPassword) => {
    return dispatch => {
        dispatch(changePasswordStart());
        const changePasswordData = {
            email: email,
            password: password
        };
        axios.post(`${apiURL}/api/users/changePassword?`, changePasswordData)
            .then(response => {
                dispatch(changePasswordSuccess());
            })
            .catch(err => {
                dispatch(changePasswordFail("error"));
            });
    };
};

export const verifyTokenStart = () => {
    return {
        type: VERIFY_TOKEN_START
    };
};

export const verifyTokenSuccess = (email, token) => {
    return {
        type: VERIFY_TOKEN_SUCCESS,
        email: email
    };
};

export const verifyTokenFail = (error) => {
    return {
        type: VERIFY_TOKEN_FAIL,
        // error: error
    };
};

//verifies the magic link used to change the password - is the token legit
//dispatches start and depending on the response, success or fail actions
export const verifyToken = (token) => {
    return dispatch => {
        dispatch(verifyTokenStart());
        axios.post(`${apiURL}/api/users/magiclink/auth?auth=${token}`)
            .then(response => {
                dispatch(verifyTokenSuccess(response.data.response));
            })
            .catch(err => {
                dispatch(verifyTokenFail("error"));
            });
    };
};