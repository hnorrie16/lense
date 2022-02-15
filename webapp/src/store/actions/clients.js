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


    UPDATE_CLIENTALL_START,
    UPDATE_CLIENTALL_SUCCESS,
    UPDATE_CLIENTALL_FAIL,

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
} from './actionTypes';
import axios from 'axios';

import {apiDev as apiURL} from '../../environment'


export const setUpdatingClientComplete = (val) => {
    return {
        type: SET_UPDATING_CLIENT_COMPLETE,
        val: val
    };
};

export const setClientUpdateConfirmModal = (val) => {
    return {
        type: SET_UPDATE_CLIENT_CONFIRM_MODAL,
        val: val
    };
};

export const setConfirmModalDeleteClient = (val) => {
    return {
        type: SET_CONFIRM_MODAL_DELETE_CLIENT,
        val: val
    };
};


export const fetchClientsStart = () => {
    return {
        type: FETCH_CLIENTS_START
    };
};

export const fetchClientsSuccess = (data) => {
    return {
        type: FETCH_CLIENTS_SUCCESS,
        clients: data.clients,
        totalClients: data.total_clients,
        lowerRange: data.lower_range,
        upperRange: data.upper_range,
        totals: data.totals
    };
};

export const fetchClientsFail = () => {
    return {
        type: FETCH_CLIENTS_FAIL
    };
};

//Fetch clients
export const fetchClients = (auth, filter, userId, limit, pageNumber) => {
    return dispatch => {
        dispatch(fetchClientsStart());
        axios.get(`${apiURL}/api/clients/fetch/${userId}`, {
            params: {
                auth, filter, limit,
                page: pageNumber
            }
        })
            .then(response => {
                dispatch(fetchClientsSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(fetchClientsFail());
            });
    };
};

export const fetchClientStart = () => {
    return {
        type: FETCH_CLIENT_START
    };
};

export const fetchClientSuccess = (client) => {
    return {
        type: FETCH_CLIENT_SUCCESS,
        client: client
    };
};

export const fetchClientFail = () => {
    return {
        type: FETCH_CLIENT_FAIL
    };
};

export const fetchClient = (auth, client_id) => {
    return dispatch => {
        dispatch(fetchClientStart());
        axios.get(`${apiURL}/api/clients/${client_id}`, { params: { auth } })
            .then(response => {
                dispatch(fetchClientSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(fetchClientFail());
            });
    };
};

export const fetchStaffClientsStart = () => {
    return {
        type: FETCH_STAFF_CLIENTS_START
    };
};

export const fetchStaffClientsSuccess = (clients) => {
    return {
        type: FETCH_STAFF_CLIENTS_SUCCESS,
        clients: clients
    };
};

export const fetchStaffClientsFail = () => {
    return {
        type: FETCH_STAFF_CLIENTS_FAIL
    };
};

export const fetchStaffClients = (auth, client_id) => {
    console.log("fetchClients()")
    return dispatch => {
        dispatch(fetchStaffClientsStart());
        axios.get(`${apiURL}/api/clients/client_id`, { params: { auth } })
            .then(response => {
                dispatch(fetchStaffClientsSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(fetchStaffClientsFail());
            });
    };
};

export const createClientStart = () => {
    return {
        type: CREATE_CLIENT_START
    };
};

export const createClientSuccess = () => {
    return {
        type: CREATE_CLIENT_SUCCESS
    };
};

export const createClientFail = () => {
    return {
        type: CREATE_CLIENT_FAIL
    };
};

export const createClient = (auth, oldData) => { /////////////////////
    return dispatch => {
        dispatch(createClientStart());
        axios.post(`${apiURL}/api/clients/`, oldData, { params: { auth } })
            .then(response => {
                dispatch(createClientSuccess());
            })
            .catch(error => {
                dispatch(createClientFail());
            });
    };
};

export const searchClientsStart = () => {
    return {
        type: SEARCH_CLIENTS_START
    };
};

export const searchClientsSuccess = (clients) => {
    return {
        type: SEARCH_CLIENTS_SUCCESS,
        clients: clients
    };
};

export const searchClientsFail = () => {
    return {
        type: SEARCH_CLIENTS_FAIL
    };
};

//Admin search clients
export const searchClients = (auth, search, filter, userId) => {
    return dispatch => {
        dispatch(searchClientsStart());
        axios.get(`${apiURL}/api/clients/search/${userId}`, {
            params: {
                auth, filter, search
            }
        })
            .then(response => {
                dispatch(searchClientsSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(searchClientsFail());
            });
    };
};

export const updateClientStart = () => {
    return {
        type: UPDATE_CLIENT_START
    };
};

export const updateClientSuccess = (client_id, updatedClient, isArchived) => {
    return {
        type: UPDATE_CLIENT_SUCCESS,
        updatedClient: updatedClient,
        isArchived: isArchived,
        client_id: client_id
    };
};

export const updateClientFail = (error) => {
    return {
        type: UPDATE_CLIENT_FAIL,
        error: error
    };
};

export const updateClient = (auth, client_id, updated_client, isArchived) => {
    return dispatch => {
        dispatch(updateClientStart());
        axios.put(`${apiURL}/api/clients/update/${client_id}`, updated_client, { params: { auth } })
            .then(response => {
                dispatch(updateClientSuccess(client_id, updated_client, isArchived));
            })
            .catch(error => {
                //dispatch(updateClientFail(error ? error.response.data.error : "error"));
            });
    };
};









export const updateClientAllStart = () => {
    return {
        type: UPDATE_CLIENTALL_START
    };
};

export const updateClientAllSuccess = (client_id, updatedClient, isArchived) => {
    return {
        type: UPDATE_CLIENTALL_SUCCESS,
        updatedClient: updatedClient,
        isArchived: isArchived,
        client_id: client_id
    };
};

export const updateClientAllFail = (error) => {
    return {
        type: UPDATE_CLIENTALL_FAIL,
        error: error
    };
};

export const updateClientAll = (auth, client_id, updated_client, isArchived) => {
    return dispatch => {
        dispatch(updateClientAllStart());
        axios.put(`${apiURL}/api/clients/updateAll/${client_id}`, updated_client, { params: { auth } })
            .then(response => {
                dispatch(updateClientAllSuccess(client_id, updated_client, isArchived));
            })
            .catch(error => {
                dispatch(updateClientAllFail(error ? error.response.data.error : "error"));
            });
    };
};


































export const deleteClientStart = () => {
    return {
        type: DELETE_CLIENT_START
    };
};

export const deleteClientSuccess = (client_id) => {
    return {
        type: DELETE_CLIENT_SUCCESS,
        client_id: client_id
    };
};

export const deleteClientFail = () => {
    return {
        type: DELETE_CLIENT_FAIL
    };
};

export const deleteClient = (auth, client_id) => {
    return dispatch => {
        dispatch(deleteClientStart());
        axios.delete(`${apiURL}/api/clients/${client_id}`, { params: { auth } })
            .then(response => {
                dispatch(deleteClientSuccess(response.data.response.id));
            })
            .catch(error => {
                dispatch(deleteClientFail());
            });
    };
};

