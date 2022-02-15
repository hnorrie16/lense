import {
    FETCH_STAFF_START,
    FETCH_STAFF_SUCCESS,
    FETCH_STAFF_FAIL,
    REGISTER_STAFF_USER_START,
    REGISTER_STAFF_USER_SUCCESS,
    REGISTER_STAFF_USER_FAIL,
    CREATE_STAFF_CLIENT_LINK_START,
    CREATE_STAFF_CLIENT_LINK_SUCCESS,
    CREATE_STAFF_CLIENT_LINK_FAIL,
    DELETE_STAFF_CLIENT_LINK_START,
    DELETE_STAFF_CLIENT_LINK_SUCCESS,
    DELETE_STAFF_CLIENT_LINK_FAIL,
    DELETE_STAFF_START,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAIL,
    UPDATE_STAFF_START,
    UPDATE_STAFF_SUCCESS,
    UPDATE_STAFF_FAIL,
    SEARCH_STAFF_START,
    SEARCH_STAFF_SUCCESS,
    SEARCH_STAFF_FAIL,
    SET_STAFF_CLIENT_LINK_MODAL,
    SET_STAFF_CLIENT_LINK_PANEL,
    SET_CONFIRM_MODAL_DELETE_STAFF,
    SET_STAFF_DELETE_LOADING_COMPLETE,
    SEARCH_CLIENTS_LINK_MODAL_START,
    SEARCH_CLIENTS_LINK_MODAL_SUCCESS,
    SEARCH_CLIENTS_LINK_MODAL_FAIL,
    FETCH_STAFF_CLIENTS_START,
    FETCH_STAFF_CLIENTS_SUCCESS,
    FETCH_STAFF_CLIENTS_FAIL,
    SET_REGISTER_STAFF_MODAL,
    SET_REGISTER_STAFF_CONFIRM_MODAL,
    SET_REGISTERING_STAFF_COMPLETE,

    UPDATE_PRIVILEGES_START,
    UPDATE_PRIVILEGES_SUCCESS,
    UPDATE_PRIVILEGES_FAIL,
    SAVE_USER_DETAILS,
    SET_UPDATING_STAFF_COMPLETE,
    SET_UPDATE_STAFF_CONFIRM_MODAL,
    SET_UPDATE_STAFF_MODAL
} from './actionTypes';
import axios from 'axios'

import {apiDev as apiURL} from '../../environment'


export const updatePrivilegesStart = () => {
    return {
        type: UPDATE_PRIVILEGES_START
    };
};

export const updatePrivilegesSuccess = (user_id) => {
    return {
        type: UPDATE_PRIVILEGES_SUCCESS,
        user_id: user_id
    };
};

export const updatePrivilegesFail = () => {
    return {
        type: UPDATE_PRIVILEGES_FAIL
    };
};

export const updatePrivileges = (auth, user_id, role) => {
    return dispatch => {
        dispatch(updatePrivilegesStart());
        axios.put(`${apiURL}/api/users/update/${user_id}`, { role: role }, { params: { auth } })
            .then(response => {
                dispatch(updatePrivilegesSuccess(user_id));
            })
            .catch(error => {
                dispatch(updatePrivilegesFail());
            });
    };
};

export const setRegisteringStaffComplete = (val) => {
    return {
        type: SET_REGISTERING_STAFF_COMPLETE,
        val: val
    };
};

export const setRegisterStaffConfirmModal = (val) => {
    return {
        type: SET_REGISTER_STAFF_CONFIRM_MODAL,
        val: val
    };
};

export const setRegisterStaffModal = (val) => {
    return {
        type: SET_REGISTER_STAFF_MODAL,
        val: val
    };
};

export const setUpdatingStaffComplete = (val) => {
    return {
        type: SET_UPDATING_STAFF_COMPLETE,
        val: val
    };
};

export const setUpdateStaffConfirmModal = (val) => {
    return {
        type: SET_UPDATE_STAFF_CONFIRM_MODAL,
        val: val
    };
};

export const setUpdateStaffModal = (val) => {
    return {
        type: SET_UPDATE_STAFF_MODAL,
        val: val
    };
};

export const setStaffDeleteLoadingComplete = (val) => {
    return {
        type: SET_STAFF_DELETE_LOADING_COMPLETE,
        val: val
    };
};

export const setConfirmModalDeleteStaff = (val) => {
    return {
        type: SET_CONFIRM_MODAL_DELETE_STAFF,
        val: val
    };
};

export const setStaffClientLinkModal = (val) => {
    return {
        type: SET_STAFF_CLIENT_LINK_MODAL,
        val: val
    };
};

export const setStaffClientLinkPanel = (val, selectedStaff) => {
    return {
        type: SET_STAFF_CLIENT_LINK_PANEL,
        val: val,
        selectedStaff: selectedStaff
    };
};

export const saveUserDetails = (details) => {
    return {
        type: SAVE_USER_DETAILS,
        details: details
    };
};


export const fetchStaffStart = () => {
    return {
        type: FETCH_STAFF_START
    };
};

export const fetchStaffSuccess = (data) => {
    return {
        type: FETCH_STAFF_SUCCESS,
        staff: data.users,
        totalUsers: data.total_users,
        lowerRange: data.lower_range,
        upperRange: data.upper_range
    };
};

export const fetchStaffFail = () => {
    return {
        type: FETCH_STAFF_FAIL
    };
};

export const fetchStaff = (auth, filter, limit, pageNumber) => {
    return dispatch => {
        
        dispatch(fetchStaffStart());
        
        axios.get(`${apiURL}/api/users`, {
            params: {
                auth,
                filter: filter,
                limit: limit,
                page: pageNumber

            }
        })
        
        
            .then(response => {
                dispatch(fetchStaffSuccess(response.data.response));
            })
            .catch(error => {

                dispatch(fetchStaffFail());
            });
    };
};

export const registerStaffUserStart = () => {
    return {
        type: REGISTER_STAFF_USER_START
    };
};

export const registerStaffUserSuccess = (new_user) => {
    return {
        type: REGISTER_STAFF_USER_SUCCESS,
        new_user: new_user
    };
};

export const registerStaffUserFail = (error) => {
    return {
        type: REGISTER_STAFF_USER_FAIL,
        error: error
    };
};

export const registerStaffUser = (auth, staff) => {
    return dispatch => {
        dispatch(registerStaffUserStart());
        axios.post(`${apiURL}/api/users/register`, staff, { params: { auth } })
            .then(response => {
                dispatch(registerStaffUserSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(registerStaffUserFail(error ? error.response.data.error : "error"));
            });
    };
};

export const createStaffClientLinkStart = () => {
    return {
        type: CREATE_STAFF_CLIENT_LINK_START
    };
};

export const createStaffClientLinkSuccess = (clients, client) => {
    return {
        type: CREATE_STAFF_CLIENT_LINK_SUCCESS,
        clients: clients,
        client: client
    };
};

export const createStaffClientLinkFail = () => {
    return {
        type: CREATE_STAFF_CLIENT_LINK_FAIL
    };
};

export const createStaffClientLink = (auth, staff_id, updated_client_list, client) => {
    return dispatch => {
        dispatch(createStaffClientLinkStart());
        axios.put(`${apiURL}/api/users/updateClientLink/${staff_id}`, updated_client_list, { params: { auth } })
            .then(response => {
                dispatch(createStaffClientLinkSuccess(response.data.response.clients, client));
            })
            .catch(error => {
                dispatch(createStaffClientLinkFail());
            });
    };
};

export const deleteStaffClientLinkStart = () => {
    return {
        type: DELETE_STAFF_CLIENT_LINK_START
    };
};

export const deleteStaffClientLinkSuccess = (clients, client) => {
    return {
        type: DELETE_STAFF_CLIENT_LINK_SUCCESS,
        clients: clients,
        client: client
    };
};

export const deleteStaffClientLinkFail = () => {
    return {
        type: DELETE_STAFF_CLIENT_LINK_FAIL
    };
};

export const deleteStaffClientLink = (auth, staff_id, updated_client_list, client) => {
    return dispatch => {
        dispatch(deleteStaffClientLinkStart());
        axios.put(`${apiURL}/api/users/updateClientLink/${staff_id}`, updated_client_list, { params: { auth } })
            .then(response => {
                dispatch(deleteStaffClientLinkSuccess(response.data.response.clients, client));
            })
            .catch(error => {
                dispatch(deleteStaffClientLinkFail());
            });
    };
};

export const deleteStaffStart = () => {
    return {
        type: DELETE_STAFF_START
    };
};

export const deleteStaffSuccess = (staff_id) => {
    return {
        type: DELETE_STAFF_SUCCESS,
        staff_id: staff_id
    };
};

export const deleteStaffFail = () => {
    return {
        type: DELETE_STAFF_FAIL
    };
};

export const deleteStaff = (auth, staff_id) => {
    return dispatch => {
        dispatch(deleteStaffStart());
        axios.delete(`${apiURL}/api/users/${staff_id}`, { params: { auth } })
            .then(response => {
                dispatch(deleteStaffSuccess(response.data.response.id));
            })
            .catch(error => {
                dispatch(deleteStaffFail());
            });
    };
};

export const updateStaffStart = () => {
    return {
        type: UPDATE_STAFF_START
    };
};

export const updateStaffSuccess = (staff_id, updatedStaff) => {
    return {
        type: UPDATE_STAFF_SUCCESS,
        staff_id: staff_id,
        updatedStaff: updatedStaff
    };
};

export const updateStaffFail = (error) => {
    return {
        type: UPDATE_STAFF_FAIL,
        error: error
    };
};

export const updateStaff = (auth, staff_id, updatedStaff) => {
    return dispatch => {
        dispatch(updateStaffStart());
        axios.put(`${apiURL}/api/users/update/${staff_id}`, updatedStaff, { params: { auth } })
            .then(response => {
                dispatch(updateStaffSuccess(staff_id, updatedStaff));
            })
            .catch(error => {
                dispatch(updateStaffFail(error ? error.response.data.error : "error"));
            });
    };
};

export const searchStaffStart = () => {
    return {
        type: SEARCH_STAFF_START
    };
};

export const searchStaffSuccess = (staff) => {
    return {
        type: SEARCH_STAFF_SUCCESS,
        staff: staff
    };
};

export const searchStaffFail = () => {
    return {
        type: SEARCH_STAFF_FAIL
    };
};

export const searchStaff = (auth, filter, search) => {
    return dispatch => {
        dispatch(searchStaffStart());
        axios.get(`${apiURL}/api/users/search`, {
            params: {
                filter, search, auth
            }
        })
            .then(response => {
                dispatch(searchStaffSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(searchStaffFail());
            });
    };
};

export const searchClientsLinkModalStart = () => {
    return {
        type: SEARCH_CLIENTS_LINK_MODAL_START
    };
};

export const searchClientsLinkModalSuccess = (clients) => {
    return {
        type: SEARCH_CLIENTS_LINK_MODAL_SUCCESS,
        clients: clients
    };
};

export const searchClientsLinkModalFail = () => {
    return {
        type: SEARCH_CLIENTS_LINK_MODAL_FAIL
    };
};

//Admin search clients
export const searchClientsLinkModal = (auth, search) => {
    return dispatch => {
        dispatch(searchClientsLinkModalStart());
        axios.get(`${apiURL}/api/users/searchClients/`, {
            params: {
                search, auth
            }
        })
            .then(response => {
                dispatch(searchClientsLinkModalSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(searchClientsLinkModalFail());
            });
    };
};

export const fetchStaffClientsStart = () => {
    return {
        type: FETCH_STAFF_CLIENTS_START
    };
};

export const fetchStaffClientsSuccess = (clients) => {
    console.log(clients)
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

//Admin search clients
export const fetchStaffClients = (auth, staff_id) => {
    return dispatch => {
        dispatch(fetchStaffClientsStart());
        axios.get(`${apiURL}/api/users/staffClients/${staff_id}`, { params: { auth } })
            .then(response => {
                dispatch(fetchStaffClientsSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(fetchStaffClientsFail());
            });
    };
};