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
} from "./actionType";
import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserError = error => ({type: REGISTER_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const loginFacebookSuccess = user => ({type: LOGIN_FACEBOOK_SUCCESS, user});
export const getUsersSuccess = (users) => ({type: GET_USERS_SUCCESS, users});

export const getUserIdSuccess = (user) => ({type: GET_USER_ID_SUCCESS, user});
export const getUserIdRequest = () => ({type: GET_USER_ID_REQUEST});
export const getUserIdError = (error) => ({type: GET_USER_ID_ERROR});

export const updateProfileSuccess = user => ({type: UPDATE_PROFILE_SUCCESS, user});
export const updateProfileRequest = () => ({type: UPDATE_PROFILE_REQUEST});
export const updateProfileError = (error) => ({type: UPDATE_PROFILE_ERROR});

export const subscribeUserSuccess = (user)=> ({type: SUBSCRIBE_USER_SUCCESS, user});


export const loginUser = user => {
    return async (dispatch) => {
        try{
            dispatch(loginUserRequest());
            const res = await axiosApi.post('/users/sessions', user);
            dispatch(loginUserSuccess(res.data))
            dispatch(push('/'))
        }catch (e) {
            if (e.response && e.response.data){
                dispatch(loginUserError(e.response.data))
            }else{
                dispatch(loginUserError(e))
            }
        }
    }
};

export const loginFacebook = user => {
    return async (dispatch)=>{
        const res = await axiosApi.post('/users/facebook', user);
        dispatch(loginFacebookSuccess(res.data));
        dispatch(push('/'))

    }
 };

export const registerUser = (user) => {
  return async (dispatch) => {
      try{
          dispatch(registerUserRequest());
          const res = await axiosApi.post('/users', user);
          dispatch(registerUserSuccess(res.data));
          dispatch(push('/'))
      }catch (e) {
          if (e.response && e.response.data){
              dispatch(registerUserError(e.response.data))
          }else{
              dispatch(registerUserError(e))
          }
      }
  }
};

export const logoutUser = () =>{
  return async (dispatch, getState) =>{
      try{
          const token = getState().users.user.token;
          const config = {headers: {'Authorization' : 'Token ' + token}};
          await axiosApi.delete('/users/sessions', config);
          dispatch(logoutUserSuccess());
          dispatch(push('/login'))
      }catch (e) {
          console.error(e)
      }
  }
};

export const getUsers = () => {
  return async (dispatch) => {
      try {
          const res = await axiosApi.get('/users');
          dispatch(getUsersSuccess(res.data));
      }catch (e) {
          console.error(e)
      }
  }
};

export const getUserId = (id) => {
  return async (dispatch) => {
      try{
          dispatch(getUserIdRequest());
          const res = await axiosApi.get('/users/user/' + id );
          dispatch(getUserIdSuccess(res.data))
      }catch (e) {
          dispatch(getUserIdRequest());
          if (e.response && e.response.data){
              dispatch(getUserIdError(e.response.data))
          }else{
              dispatch(getUserIdError(e))
          }
      }
  }
};

export const updateProfile = (userData) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            dispatch(updateProfileRequest());
            const res = await axiosApi.put('/users/update', userData, config );
            dispatch(updateProfileSuccess(res.data));
            dispatch(push('/'))
        }catch (e) {
            dispatch(updateProfileRequest());
            dispatch(updateProfileError(e))
        }
    }
};

export const subscribeUser = (id) => {
    return async (dispatch, getState) =>{
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            const res = await axiosApi.post('/users/subscribe', {id}, config);
            dispatch(subscribeUserSuccess(res.data));
        }catch (e) {
            if (e.response){
                console.error(e.response.data)
            }
            console.error(e)
        }
    }
};
