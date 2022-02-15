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

} from '../actions/actionTypes';
import { updateObject, checkIfDefined } from '../../shared/Utility'
const clone = require('rfdc')()

const initialState = {
    loading: false,
    staff: [],
    showStaffClientLinkModal: false,
    showStaffClientLinkPanel: false,
    selectedStaff: {},
    signedInUser: {},
    showDeleteStaffModal: false,
    staffDeleteLoadingComplete: false,
    loading_delete_staff: false,
    clients: [],
    loading_link: false,
    loading_delete_link: false,
    selectedStaffClients: [],
    totalUsers: 0,
    lowerRange: 1,
    upperRange: 1,
    showRegisterStaffModal: false,
    showRegisterStaffConfirmModal: false,
    registeringStaffComplete: false,
    loadingRegisterStaff: false,
    loading_update_privileges: false,
    error: null,
    loadingFetchingStaffClients: false,
    loadingSearchStaffClients: false,
    loadingUpdatingStaff: false,
    updatingStaffComplete: false,
    showUpdateStaffModal: false,
    showUpdateStaffConfirmModal: false,
}

const updatePrivilegesStart = (state, action) => {
    return updateObject(state, {
        loading_update_privileges: true,
    });
}

const updatePrivilegesSuccess = (state, action) => {
    let staffCopy = clone(state.staff)
    staffCopy = staffCopy.filter(staff => staff.id !== action.user_id)

    return updateObject(state, {
        loading_update_privileges: false,
        staff: staffCopy
    });
}

const updatePrivilegesFail = (state, action) => {
    return updateObject(state, {
        loading_update_privileges: false,
    });
}

const registerStaffUserStart = (state, action) => {
    return updateObject(state, {
        loadingRegisterStaff: true,
        registeringStaffComplete: false,
        error: null
    });
}

const registerStaffUserSuccess = (state, action) => {
    let staffCopy = clone(state.staff)
    staffCopy.push(action.new_user)

    return updateObject(state, {
        loadingRegisterStaff: false,
        staff: staffCopy,
        registeringStaffComplete: true,
        error: null
    });
}

const registerStaffUserFail = (state, action) => {
    return updateObject(state, {
        loadingRegisterStaff: false,
        registeringStaffComplete: false,
        error: action.error
    });
}

const setRegisteringStaffComplete = (state, action) => {
    return updateObject(state, {
        registeringStaffComplete: action.val
    });
}

const setRegisterStaffConfirmModal = (state, action) => {
    return updateObject(state, {
        showRegisterStaffConfirmModal: action.val,
        error: null
    });
}
const setRegisterStaffModal = (state, action) => {
    return updateObject(state, {
        showRegisterStaffModal: action.val
    });
}

const setUpdatingStaffComplete = (state, action) => {
    return updateObject(state, {
        updatingStaffComplete: action.val
    });
}

const setUpdateStaffConfirmModal = (state, action) => {
    return updateObject(state, {
        showUpdateStaffConfirmModal: action.val,
        error: null
    });
}
const setUpdateStaffModal = (state, action) => {
    return updateObject(state, {
        showUpdateStaffModal: action.val
    });
}

const setStaffDeleteLoadingComplete = (state, action) => {
    return updateObject(state, {
        staffDeleteLoadingComplete: action.val
    });
}

const setConfirmModalDeleteStaff = (state, action) => {
    return updateObject(state, {
        showDeleteStaffModal: action.val
    });
}

const setStaffClientLinkModal = (state, action) => {
    return updateObject(state, {
        showStaffClientLinkModal: action.val
    });
}

const setStaffClientLinkPanel = (state, action) => {
    return updateObject(state, {
        showStaffClientLinkPanel: action.val,
        selectedStaff: checkIfDefined(action.selectedStaff, {})
    });
}

const saveUserDetails = (state, action) => {
    return updateObject(state, {
        signedInUser: action.details
    });
}

const fetchStaffStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchStaffSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        staff: action.staff,
        totalUsers: action.totalUsers,
        lowerRange: action.lowerRange,
        upperRange: action.upperRange
    });
}

const fetchStaffFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const createStaffClientLinkStart = (state, action) => {
    return updateObject(state, {
        loading_link: true
    });
}

const createStaffClientLinkSuccess = (state, action) => {
    let selectedStaffCopy = clone(state.selectedStaff)
    selectedStaffCopy["clients"] = action.clients
    let clientsCopy = clone(state.clients)

    let clients = clientsCopy.map(client => {
        let clientUpdated = client
        if (action.client.id === client.id) {
            clientUpdated = {
                ...client,
                selected: true
            }
        }
        return clientUpdated
    })
    let selectedStaffClientsCopy = clone(state.selectedStaffClients)
    selectedStaffClientsCopy.push(action.client)

    return updateObject(state, {
        clients: clients,
        selectedStaff: selectedStaffCopy,
        selectedStaffClients: selectedStaffClientsCopy,
        loading_link: false
    });
}

const createStaffClientLinkFail = (state, action) => {
    return updateObject(state, {
        loading_link: false
    });
}

const deleteStaffClientLinkStart = (state, action) => {
    return updateObject(state, {
        loading_delete_link: true
    });
}

const deleteStaffClientLinkSuccess = (state, action) => {
    let selectedStaffCopy = clone(state.selectedStaff)
    selectedStaffCopy["clients"] = action.clients

    let selectedStaffClientsCopy = clone(state.selectedStaffClients)
    selectedStaffClientsCopy = selectedStaffClientsCopy.filter(client => client.id !== action.client.id)
    let clientsCopy = clone(state.clients)
    // clientsCopy = clientsCopy.filter(client => client.id !== action.client.id)

    clientsCopy = clientsCopy.map(client => {
        let clientUpdated = client
        if (action.client.id === client.id) {
            clientUpdated = {
                ...client,
                selected: false
            }
        }
        return clientUpdated
    })
    return updateObject(state, {
        selectedStaff: selectedStaffCopy,
        selectedStaffClients: selectedStaffClientsCopy,
        loading_delete_link: false,
        clients: clientsCopy
    });
}

const deleteStaffClientLinkFail = (state, action) => {
    return updateObject(state, {
        loading_delete_link: false
    });
}

const deleteStaffStart = (state, action) => {
    return updateObject(state, {
        staffDeleteLoadingComplete: false,
        loading_delete_staff: true
    });
}

const deleteStaffSuccess = (state, action) => {
    let staffCopy = clone(state.staff)
    staffCopy = staffCopy.filter(staff => staff.id !== action.staff_id)
    return updateObject(state, {
        staff: staffCopy,
        staffDeleteLoadingComplete: true,
        loading_delete_staff: false
    });
}

const deleteStaffFail = (state, action) => {
    return updateObject(state, {
        staffDeleteLoadingComplete: false,
        loading_delete_staff: false
    });
}

const updateStaffStart = (state, action) => {
    return updateObject(state, {
        loadingUpdatingStaff: true,
        updatingStaffComplete: false,
        error: null
    });
}

const updateStaffSuccess = (state, action) => {

    return updateObject(state, {
        loadingUpdatingStaff: false,
        updatingStaffComplete: true,
        signedInUser: action.updatedStaff,
        error: null
    });
}

const updateStaffFail = (state, action) => {
    return updateObject(state, {
        loadingUpdatingStaff: false,
        updatingStaffComplete: false,
        error: action.error
    });
}

const searchStaffStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const searchStaffSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        staff: action.staff
    });
}

const searchStaffFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}


const searchClientsLinkModalStart = (state, action) => {
    return updateObject(state, {
        loadingSearchStaffClients: true
    });
}

const searchClientsLinkModalSuccess = (state, action) => {
    const clients = action.clients.map(client => {
        return {
            ...client,
            selected: state.selectedStaffClients.find(item => client.id === item.id) && true ? true : false
        }
    }
    )
    return updateObject(state, {
        loadingSearchStaffClients: false,
        clients: clients
    });
}

const searchClientsLinkModalFail = (state, action) => {
    return updateObject(state, {
        loadingSearchStaffClients: false
    });
}

const fetchStaffClientsStart = (state, action) => {
    return updateObject(state, {
        loadingFetchingStaffClients: true
    });
}

const fetchStaffClientsSuccess = (state, action) => {
    return updateObject(state, {
        loadingFetchingStaffClients: false,
        selectedStaffClients: action.clients
    });
}

const fetchStaffClientsFail = (state, action) => {
    return updateObject(state, {
        loadingFetchingStaffClients: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_PRIVILEGES_START: return updatePrivilegesStart(state, action)
        case UPDATE_PRIVILEGES_SUCCESS: return updatePrivilegesSuccess(state, action)
        case UPDATE_PRIVILEGES_FAIL: return updatePrivilegesFail(state, action)


        case SET_REGISTERING_STAFF_COMPLETE: return setRegisteringStaffComplete(state, action)
        case SET_REGISTER_STAFF_CONFIRM_MODAL: return setRegisterStaffConfirmModal(state, action)
        case SET_REGISTER_STAFF_MODAL: return setRegisterStaffModal(state, action)

        case SET_UPDATING_STAFF_COMPLETE: return setUpdatingStaffComplete(state, action)
        case SET_UPDATE_STAFF_CONFIRM_MODAL: return setUpdateStaffConfirmModal(state, action)
        case SET_UPDATE_STAFF_MODAL: return setUpdateStaffModal(state, action)

        case FETCH_STAFF_CLIENTS_START: return fetchStaffClientsStart(state, action)
        case FETCH_STAFF_CLIENTS_SUCCESS: return fetchStaffClientsSuccess(state, action)
        case FETCH_STAFF_CLIENTS_FAIL: return fetchStaffClientsFail(state, action)

        case SEARCH_CLIENTS_LINK_MODAL_START: return searchClientsLinkModalStart(state, action)
        case SEARCH_CLIENTS_LINK_MODAL_SUCCESS: return searchClientsLinkModalSuccess(state, action)
        case SEARCH_CLIENTS_LINK_MODAL_FAIL: return searchClientsLinkModalFail(state, action)

        case SET_STAFF_DELETE_LOADING_COMPLETE: return setStaffDeleteLoadingComplete(state, action)
        case SET_CONFIRM_MODAL_DELETE_STAFF: return setConfirmModalDeleteStaff(state, action)
        case SET_STAFF_CLIENT_LINK_MODAL: return setStaffClientLinkModal(state, action)
        case SET_STAFF_CLIENT_LINK_PANEL: return setStaffClientLinkPanel(state, action)
        case SAVE_USER_DETAILS: return saveUserDetails(state, action)

        case FETCH_STAFF_START: return fetchStaffStart(state, action)
        case FETCH_STAFF_SUCCESS: return fetchStaffSuccess(state, action)
        case FETCH_STAFF_FAIL: return fetchStaffFail(state, action)
        case REGISTER_STAFF_USER_START: return registerStaffUserStart(state, action)
        case REGISTER_STAFF_USER_SUCCESS: return registerStaffUserSuccess(state, action)
        case REGISTER_STAFF_USER_FAIL: return registerStaffUserFail(state, action)

        case CREATE_STAFF_CLIENT_LINK_START: return createStaffClientLinkStart(state, action)
        case CREATE_STAFF_CLIENT_LINK_SUCCESS: return createStaffClientLinkSuccess(state, action)
        case CREATE_STAFF_CLIENT_LINK_FAIL: return createStaffClientLinkFail(state, action)
        case DELETE_STAFF_CLIENT_LINK_START: return deleteStaffClientLinkStart(state, action)
        case DELETE_STAFF_CLIENT_LINK_SUCCESS: return deleteStaffClientLinkSuccess(state, action)
        case DELETE_STAFF_CLIENT_LINK_FAIL: return deleteStaffClientLinkFail(state, action)
        case DELETE_STAFF_START: return deleteStaffStart(state, action)
        case DELETE_STAFF_SUCCESS: return deleteStaffSuccess(state, action)
        case DELETE_STAFF_FAIL: return deleteStaffFail(state, action)
        case UPDATE_STAFF_START: return updateStaffStart(state, action)
        case UPDATE_STAFF_SUCCESS: return updateStaffSuccess(state, action)
        case UPDATE_STAFF_FAIL: return updateStaffFail(state, action)
        case SEARCH_STAFF_START: return searchStaffStart(state, action)
        case SEARCH_STAFF_SUCCESS: return searchStaffSuccess(state, action)
        case SEARCH_STAFF_FAIL: return searchStaffFail(state, action)
        default:
            return state;
    }
};

export default reducer;