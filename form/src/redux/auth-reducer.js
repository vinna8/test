import { authAPI } from "../api/api";
import { instance } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR = 'SET_ERROR';
const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const DISABLED = 'DISABLED';

let initialState = {
    id: null,
    email: null,
    phone: null,
    avatar: null,
    firstName: null,
    lastName: null,
    city: null,
    country: null,
    isAuth: false,
    isFetching: false,
    isDisabled: false,
    message: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_ERROR:
            return {
                ...state,
                ...action.data,
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                isAuth: false,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case DISABLED:
            return {
                ...state, 
                isDisabled: action.isDisabled
            }
        default:
            return state;
    }
}

export const setAuthUserData = (email, phone, avatar, firstName, lastName, city, country, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {email, phone, avatar, firstName, lastName, city, country, isAuth}
    };
}

export const setError = (message) => {
    return {
        type: SET_ERROR,
        data: {message}
    };
}

export const clearAuthUserData = () => {
    return {
        type: CLEAR_USER_DATA,
    };
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
}

export const isDisabled = (isDisabled) => {
    return {
        type: DISABLED,
        isDisabled
    };
}

export const getAuthUserData = () => {
    return (dispatch) => {
        dispatch(isDisabled(false));
        dispatch(toggleIsFetching(true));
        return authAPI.me()
        .then(response => {
            /*console.log(response.data)*/
            dispatch(toggleIsFetching(false));
            if (response.data.activated){
                let {email, phone, avatar, firstName, lastName, city, country} = response.data;
                dispatch(setAuthUserData(email, phone, avatar, firstName, lastName, city, country, true));
            }
        })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(isDisabled(true));
        authAPI.login(email, password)
        .then(response => {
            dispatch(isDisabled(false));
            /*console.log(response.data)*/
            if (response.data.token){
                localStorage.setItem('token', response.data.token)
                instance.defaults.headers.common['Authorization'] = `${localStorage.token}`
                dispatch(setError(null));
                dispatch(getAuthUserData());
            } else {
                let message = response.data.error.message
                /*console.log(message);*/
                dispatch(setError(message));
            }
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(clearAuthUserData());
    }
}

export default authReducer;
