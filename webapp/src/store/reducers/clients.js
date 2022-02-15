import {
    FETCH_CLIENTS_START,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAIL,
    DELETE_CLIENT_START,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAIL,
    UPDATE_CLIENT_START,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,
    CREATE_CLIENT_START,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAIL,
    FETCH_CLIENT_START,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_FAIL,
    FETCH_STAFF_CLIENTS_START,
    FETCH_STAFF_CLIENTS_SUCCESS,
    FETCH_STAFF_CLIENTS_FAIL,
    SEARCH_CLIENTS_START,
    SEARCH_CLIENTS_SUCCESS,
    SEARCH_CLIENTS_FAIL,
    SET_UPDATE_CLIENT_CONFIRM_MODAL,
    SET_UPDATING_CLIENT_COMPLETE,
    SET_CONFIRM_MODAL_DELETE_CLIENT,
} from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';
const clone = require('rfdc')()

const initialState = {
    loading: false,
    clients: [],
    client: {},
    loading_fetch_client: false,
    loading_posting_client_update: false,
    showClientUpdateConfirmModal: false,
    updating_client_complete: false,
    totalClients: 0,
    lowerRange: 1,
    upperRange: 1,
    error: null,
    loading_delete_client: false,
    clientDeleteComplete: false,
    showDeleteClientModal: false,
    totals: {}
}

const setClientUpdateConfirmModal = (state, action) => {
    return updateObject(state, {
        showClientUpdateConfirmModal: action.val,
        error: null
    });
}

const setUpdatingClientComplete = (state, action) => {
    return updateObject(state, {
        updating_client_complete: action.val
    });
}

const setConfirmModalDeleteClient = (state, action) => {
    return updateObject(state, {
        showDeleteClientModal: action.val,
        clientDeleteComplete: false,

    });
}


const fetchClientsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchClientsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        clients: action.clients,
        totalClients: action.totalClients,
        lowerRange: action.lowerRange,
        upperRange: action.upperRange,
        totals: action.totals
    });
}

const fetchClientsFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const fetchClientStart = (state, action) => {
    return updateObject(state, {
        loading_fetch_client: true
    });
}

const fetchClientSuccess = (state, action) => {
    return updateObject(state, {
        loading_fetch_client: false,
        client: action.client
    });
}

const fetchClientFail = (state, action) => {
    return updateObject(state, {
        loading_fetch_client: false
    });
}

const fetchStaffClientsStart = (state, action) => {
    return updateObject(state, {

    });
}

const fetchStaffClientsSuccess = (state, action) => {
    return updateObject(state, {

    });
}

const fetchStaffClientsFail = (state, action) => {
    return updateObject(state, {

    });
}

const createClientStart = (state, action) => {
    return updateObject(state, {

    });
}

const createClientSuccess = (state, action) => {
    return updateObject(state, {

    });
}

const createClientFail = (state, action) => {
    return updateObject(state, {

    });
}

const searchClientsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const searchClientsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        clients: action.clients
    });
}

const searchClientsFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const updateClientStart = (state, action) => {
    return updateObject(state, {
        loading_posting_client_update: true,
        updating_client_complete: false,
        error: null
    });
}

const updateClientSuccess = (state, action) => {
    //if the client is being archived - remove from clients list
    if (action.isArchived) {
        let clientsCopy = clone(state.clients)
        let newCopy = clientsCopy.filter(client => client.id !== action.client_id)
        return updateObject(state, {
            clients: newCopy,
            loading_posting_client_update: false
        });
    }
    //else - update the specific client
    else {
        return updateObject(state, {
            client: action.updatedClient,
            loading_posting_client_update: false,
            updating_client_complete: true,
            error: null
        });
    }
}

const updateClientFail = (state, action) => {
    return updateObject(state, {
        loading_posting_client_update: false,
        updating_client_complete: false,
        error: action.error
    });
}

const deleteClientStart = (state, action) => {
    return updateObject(state, {
        loading_delete_client: true,
        clientDeleteComplete: false
    });
}

const deleteClientSuccess = (state, action) => {
    let clientsCopy = clone(state.clients)
    clientsCopy = clientsCopy.filter(client => client.id !== action.client_id)

    return updateObject(state, {
        clients: clientsCopy,
        loading_delete_client: false,
        clientDeleteComplete: true
    });
}

const deleteClientFail = (state, action) => {
    return updateObject(state, {
        loading_delete_client: false,
        clientDeleteComplete: false
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UPDATING_CLIENT_COMPLETE: return setUpdatingClientComplete(state, action);
        case SET_UPDATE_CLIENT_CONFIRM_MODAL: return setClientUpdateConfirmModal(state, action);
        case SET_CONFIRM_MODAL_DELETE_CLIENT: return setConfirmModalDeleteClient(state, action)

        case FETCH_CLIENTS_START: return fetchClientsStart(state, action);
        case FETCH_CLIENTS_SUCCESS: return fetchClientsSuccess(state, action);
        case FETCH_CLIENTS_FAIL: return fetchClientsFail(state, action);
        case DELETE_CLIENT_START: return deleteClientStart(state, action);
        case DELETE_CLIENT_SUCCESS: return deleteClientSuccess(state, action);
        case DELETE_CLIENT_FAIL: return deleteClientFail(state, action);
        case UPDATE_CLIENT_START: return updateClientStart(state, action);
        case UPDATE_CLIENT_SUCCESS: return updateClientSuccess(state, action);
        case UPDATE_CLIENT_FAIL: return updateClientFail(state, action);
        case CREATE_CLIENT_START: return createClientStart(state, action);
        case CREATE_CLIENT_SUCCESS: return createClientSuccess(state, action);
        case CREATE_CLIENT_FAIL: return createClientFail(state, action);
        case FETCH_CLIENT_START: return fetchClientStart(state, action);
        case FETCH_CLIENT_SUCCESS: return fetchClientSuccess(state, action);
        case FETCH_CLIENT_FAIL: return fetchClientFail(state, action);
        case FETCH_STAFF_CLIENTS_START: return fetchStaffClientsStart(state, action);
        case FETCH_STAFF_CLIENTS_SUCCESS: return fetchStaffClientsSuccess(state, action);
        case FETCH_STAFF_CLIENTS_FAIL: return fetchStaffClientsFail(state, action);
        case SEARCH_CLIENTS_START: return searchClientsStart(state, action);
        case SEARCH_CLIENTS_SUCCESS: return searchClientsSuccess(state, action);
        case SEARCH_CLIENTS_FAIL: return searchClientsFail(state, action);

        default:
            return state;
    }
};

export default reducer;
















