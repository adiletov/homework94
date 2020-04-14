import {
    ADD_PUBLICATION_ERROR,
    ADD_PUBLICATION_REQUEST,
    ADD_PUBLICATION_SUCCESS,
    GET_PUBLICATIONS_ERROR, GET_PUBLICATIONS_ID_ERROR, GET_PUBLICATIONS_ID_REQUEST,
    GET_PUBLICATIONS_ID_SUCCESS,
    GET_PUBLICATIONS_REQUEST,
    GET_PUBLICATIONS_SUCCESS,
    GET_TAGS_SUCCESS
} from "../Action/actionType";

const initialState = {
    addPubLoad: false,
    addPubError: null,
    tags: [],
    publications: [],
    publicationsId: [],
    getPubError: null,
    getPubLoad: false
};

const reducerPublications = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PUBLICATION_SUCCESS:
            return {...state, addPubError: null, addPubLoad: false};
        case ADD_PUBLICATION_ERROR:
            return {...state, addPubError: action.error, addPubLoad: false};
        case ADD_PUBLICATION_REQUEST:
            return {...state, addPubLoad: true};
        case GET_TAGS_SUCCESS:
            return {...state, tags: action.tags};
        case GET_PUBLICATIONS_SUCCESS:
            return {...state, publications: action.publications, getPubError: null, getPubLoad: false};
        case GET_PUBLICATIONS_ERROR:
            return {...state, getPubLoad: false, getPubError: action.error};
        case GET_PUBLICATIONS_REQUEST:
            return {...state, getPubLoad: true};
        case GET_PUBLICATIONS_ID_SUCCESS:
            return {...state, publicationsId: action.publications, getPubLoad: false, getPubError: null};
        case GET_PUBLICATIONS_ID_REQUEST:
            return {...state, getPubLoad: true};
        case  GET_PUBLICATIONS_ID_ERROR:
            return {...state, getPubError: action.error, getPubLoad: false};
        default:
            return state
    }
};

export default reducerPublications;