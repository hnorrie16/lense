
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
import { updateObject } from '../../shared/Utility';

import SecureLS from 'secure-ls';
const ls = new SecureLS({
    encodingType: 'aes'
})

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    role: '',
    refresh_error: null,
    tokenVerified: false,
    email: "",
    passwordChangeSuccess: false,
    userDetails: ""
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};
//Authenticates the user and updates the initial state with the token and user ID
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        role: action.role,
        error: null,
        loading: false,
        userDetails: action.details
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

//logs the user out of the system and removes token and userID
const authLogout = (state, action) => {
    ls.removeAll()
    return updateObject(state, { token: null, userId: null });
};

//refreshes the user's token
const refreshSuccess = (state, action) => {
    console.log("token refresh success");
    return updateObject(state, {
        token: action.idToken,
        refresh_error: null
    });
}

const refreshFail = (state, action) => {
    return updateObject(state, {
        refresh_error: action.error
    });
}

const changePasswordStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};
//confirmation that the password has been changed
const changePasswordSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        passwordChangeSuccess: true
    });
};

const changePasswordFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        passwordChangeSuccess: false
    });
}

const verifyTokenStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        email: ""
    });
};
//verifies the staff member's token
const verifyTokenSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        tokenVerified: true,
        email: action.email
    });
};

const verifyTokenFail = (state, action) => {
    return updateObject(state, {
        tokenVerified: false,
        loading: false,
        email: ""
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case LOGOUT_SUCCESS: return authLogout(state, action);
        case TOKEN_REFRESH_SUCCESS: return refreshSuccess(state, action);
        case TOKEN_REFRESH_FAIL: return refreshFail(state, action);
        case CHANGE_STAFF_PASSWORD_START: return changePasswordStart(state, action);
        case CHANGE_STAFF_PASSWORD_SUCCESS: return changePasswordSuccess(state, action);
        case CHANGE_STAFF_PASSWORD_FAIL: return changePasswordFail(state, action);
        case VERIFY_TOKEN_START: return verifyTokenStart(state, action);
        case VERIFY_TOKEN_SUCCESS: return verifyTokenSuccess(state, action);
        case VERIFY_TOKEN_FAIL: return verifyTokenFail(state, action);
        default:
            return state;
    }
};

export default reducer;
