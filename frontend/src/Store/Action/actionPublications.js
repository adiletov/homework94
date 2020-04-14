import {
    ADD_PUBLICATION_ERROR,
    ADD_PUBLICATION_REQUEST,
    ADD_PUBLICATION_SUCCESS,
    GET_PUBLICATIONS_ERROR,
    GET_PUBLICATIONS_ID_ERROR,
    GET_PUBLICATIONS_ID_SUCCESS,
    GET_PUBLICATIONS_REQUEST,
    GET_PUBLICATIONS_SUCCESS,
    GET_TAGS_SUCCESS
} from "./actionType";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const addPublicationSuccess = () => ({type: ADD_PUBLICATION_SUCCESS});
export const addPublicationRequest = () => ({type: ADD_PUBLICATION_REQUEST});
export const addPublicationError = (error) => ({type: ADD_PUBLICATION_ERROR, error});
export const getTagsSuccess = (tags) => ({type: GET_TAGS_SUCCESS, tags});

export const getPublicationsSuccess = publications => ({type: GET_PUBLICATIONS_SUCCESS, publications});
export const getPublicationsRequest = () => ({type: GET_PUBLICATIONS_REQUEST});
export const getPublicationsError = (error) => ({type: GET_PUBLICATIONS_ERROR, error});

export const getPublicationsIdSuccess = (publications) => ({type: GET_PUBLICATIONS_ID_SUCCESS, publications});
export const getPublicationsIdRequest = () => ({type: GET_PUBLICATIONS_ID_ERROR});
export const getPublicationsIdError = (error) => ({type: GET_PUBLICATIONS_ID_ERROR, error});


export const addPublication = (publication) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            dispatch(addPublicationRequest());
            await axiosApi.post('/publications', publication, config);
            dispatch(addPublicationSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addPublicationRequest());
            if (e.response && e.response.data) {
                dispatch(addPublicationError(e.response.data))
            } else {
                dispatch(addPublicationError(e))
            }
        }
    }
};

export const getTags = () => {
    return async (dispatch) => {
        const res = await axiosApi.get('/publications/tags');
        dispatch(getTagsSuccess(res.data))
    };
};

export const getPublications = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            dispatch(getPublicationsRequest());
            const res = await axiosApi.get('/publications', config);
            dispatch(getPublicationsSuccess(res.data))
        } catch (e) {
            dispatch(getPublicationsError(e))
        }
    }
};

export const getPublicationsId = (id) => {
    return async (dispatch) => {
        try {
            dispatch(getPublicationsIdRequest());
            const res = await axiosApi.get('/publications/' + id);
            dispatch(getPublicationsIdSuccess(res.data))
        } catch (e) {
            dispatch(getPublicationsIdError(e))
        }
    }
};