import {
    GET_USER_ID_ERROR,
    GET_USER_ID_REQUEST,
    GET_USER_ID_SUCCESS,
    GET_USERS_SUCCESS,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, SUBSCRIBE_USER_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS
} from "../Action/actionType";

const initialState = {
    user: null,
    users: [],
    userId: {},
    userIdError: null,
    userIdRequest: false,
    loginError: null,
    loginLoad: false,
    registerError: null,
    registerLoad : false,
    updateError : null,
    updateRequest : false
};


const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null, loginLoad: false};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error, loginLoad: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoad: true};
        case LOGIN_FACEBOOK_SUCCESS:
            return {...state, user: action.user};
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.user,registerError: null, registerLoad: false };
        case REGISTER_USER_REQUEST:
            return {...state, registerLoad: true};
        case REGISTER_USER_ERROR:
            return {...state, registerLoad: false, registerError: action.error};
        case GET_USERS_SUCCESS:
            return {...state, users: action.users};
        case GET_USER_ID_SUCCESS:
            return {...state, userId: action.user};
        case GET_USER_ID_REQUEST:
            return {...state, userIdRequest: true};
        case GET_USER_ID_ERROR:
            return {...state, userIdError: action.error,userIdRequest: false };
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user: action.user, updateError: null, updateRequest: false};
        case UPDATE_PROFILE_ERROR:
            return {...state, updateRequest: false, updateError: action.error};
        case UPDATE_PROFILE_REQUEST:
            return {...state, updateRequest: true};
        case SUBSCRIBE_USER_SUCCESS:
            return {...state, user: action.user};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null, userId: null};
        default:
            return state
    }
};
export default reducerUser;