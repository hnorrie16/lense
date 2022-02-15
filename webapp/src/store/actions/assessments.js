import {
    DELETE_ASSESSMENT_START,
    DELETE_ASSESSMENT_SUCCESS,
    DELETE_ASSESSMENT_FAIL,
    START_ASSESSMENTS_START,
    START_ASSESSMENTS_SUCCESS,
    START_ASSESSMENTS_FAIL,
    UPDATE_ASSESSMENT_START,
    UPDATE_ASSESSMENT_SUCCESS,
    UPDATE_ASSESSMENT_FAIL,
    FETCH_ASSESSMENT_START,
    FETCH_ASSESSMENT_SUCCESS,
    FETCH_ASSESSMENT_FAIL,
    SET_CURRENT_ASSESSMENT_ID,
    SET_CURRENT_TAB,
    SET_UPLOADING_SUMMARY_REPORT,
    CACHE_QUESTIONNAIRE_CHANGES,
    SET_IS_SUMMARY_REPORT,
    ASSESSMENT_FILE_UPLOAD_START,
    ASSESSMENT_FILE_UPLOAD_SUCCESS,
    ASSESSMENT_FILE_UPLOAD_FAIL,
    SET_UPLOADING_ACTIGRAM,
    GENERATE_REPORT_START,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_FAIL,
    SET_CONFIRM_MODAL_QUESTIONNAIRE,
    SET_CONFIRM_MODAL_CONSULT,
    SET_CONFIRM_MODAL_ACTIGRAM,
    SET_CONFIRM_MODAL_ANALYSIS,
    SET_PROCESSING_XLSX_CSV,
    SET_START_ASSESSMENT_MODAL,
    SET_PHASE_COMPLETE,
    UPLOAD_SUMMARY_REPORT_START,
    UPLOAD_SUMMARY_REPORT_SUCCESS,
    UPLOAD_SUMMARY_REPORT_FAIL,
    REMOVE_SUMMARY_REPORT_START,
    REMOVE_SUMMARY_REPORT_SUCCESS,
    REMOVE_SUMMARY_REPORT_FAIL,
    REMOVE_ASSESSMENT_FILE_START,
    REMOVE_ASSESSMENT_FILE_SUCCESS,
    REMOVE_ASSESSMENT_FILE_FAIL,
    SET_UPLOADING_CONSULT_NOTES,
    SET_REMOVING_FILE_COMPLETE,
    SET_ASSESSMENT_ERROR,
    SET_START_ASSESSMENT_COMPLETE,
    SET_START_ASSESSMENT_CONFIRM_MODAL,
    SET_CONFIRM_MODAL_ASSESSMENT,
    SET_EMAIL_REPORT_MODAL,
    EMAIL_REPORT_START,
    EMAIL_REPORT_SUCCESS,
    EMAIL_REPORT_FAIL,
    CACHE_CONSULT_NOTES
} from './actionTypes';
import axios from 'axios'
import { checkIfDefined } from '../../shared/Utility'
import { fetchClients } from '../actions/clients'

import {apiDev as apiURL} from '../../environment'

export const cacheConsultNotes = (notes) => {
    return {
        type: CACHE_CONSULT_NOTES,
        notes: notes
    };
};

export const setEmailReportModal = (val) => {
    return {
        type: SET_EMAIL_REPORT_MODAL,
        val: val
    };
};

export const setStartAssessmentConfirmModal = (val) => {
    return {
        type: SET_START_ASSESSMENT_CONFIRM_MODAL,
        val: val
    };
};

export const setStartAssessmentComplete = (val) => {
    return {
        type: SET_START_ASSESSMENT_COMPLETE,
        val: val
    };
};

export const setUploadingConsultNotes = (val) => {
    return {
        type: SET_UPLOADING_CONSULT_NOTES,
        val: val
    };
};

export const setStartAssessmentModal = (val) => {
    return {
        type: SET_START_ASSESSMENT_MODAL,
        val: val
    };
};

export const setProcessingXLSXCSV = (val, fileName, isComplete) => {
    return {
        type: SET_PROCESSING_XLSX_CSV,
        val: val,
        fileName: fileName,
        isComplete: isComplete
    };
};

export const setConfirmModalQuestionnaire = (val) => {
    return {
        type: SET_CONFIRM_MODAL_QUESTIONNAIRE,
        val: val
    };
};
export const setConfirmModalConsult = (val) => {
    return {
        type: SET_CONFIRM_MODAL_CONSULT,
        val: val
    };
};
export const setConfirmModalActigram = (val) => {
    return {
        type: SET_CONFIRM_MODAL_ACTIGRAM,
        val: val
    };
};
export const setConfirmModalAnalysis = (val) => {
    return {
        type: SET_CONFIRM_MODAL_ANALYSIS,
        val: val
    };
};

export const setConfirmModalAssessment = (val) => {
    return {
        type: SET_CONFIRM_MODAL_ASSESSMENT,
        val: val
    };
};


export const setPhaseComplete = (val) => {
    return {
        type: SET_PHASE_COMPLETE,
        val: val
    };
};

export const setRemovingFileComplete = (val) => {
    return {
        type: SET_REMOVING_FILE_COMPLETE,
        val: val
    };
};


export const setIsSummaryReport = (val) => {
    return {
        type: SET_IS_SUMMARY_REPORT,
        val: val
    };
};

export const cacheQuestionnaireChanges = (updated_object) => {
    return {
        type: CACHE_QUESTIONNAIRE_CHANGES,
        updated_object: updated_object
    };
};
export const setUploadingSummaryReport = (val) => {
    return {
        type: SET_UPLOADING_SUMMARY_REPORT,
        val: val
    };
};

export const setUploadingActigram = () => {
    return {
        type: SET_UPLOADING_ACTIGRAM
    };
};

export const setCurrentTab = (phase_number) => {
    return {
        type: SET_CURRENT_TAB,
        phase_number: phase_number
    };
};

export const setCurrrentAssessmentID = (id) => {
    return {
        type: SET_CURRENT_ASSESSMENT_ID,
        id: id
    };
};

export const setAssessmentError = (name, val) => {
    return {
        type: SET_ASSESSMENT_ERROR,
        val: val,
        name: name
    };
};

export const deleteAssessmentStart = () => {
    return {
        type: DELETE_ASSESSMENT_START
    };
};

export const deleteAssessmentSuccess = () => {
    return {
        type: DELETE_ASSESSMENT_SUCCESS
    };
};

export const deleteAssessmentFail = () => {
    return {
        type: DELETE_ASSESSMENT_FAIL
    };
};

export const deleteAssessment = (auth) => {
    return dispatch => {
        dispatch(deleteAssessmentStart());
        axios.delete(`${apiURL}/api/assessment`, { params: { auth } })
            .then(response => {
                dispatch(deleteAssessmentSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(deleteAssessmentFail());
            });
    };
};

export const startAssessmentStart = () => {
    return {
        type: START_ASSESSMENTS_START
    };
};

export const startAssessmentSuccess = (data) => {
    return {
        type: START_ASSESSMENTS_SUCCESS,
        total_clients: data.total_clients,
        total_assessments: data.total_assessments
    };
};

export const startAssessmentFail = (data) => {
    return {
        type: START_ASSESSMENTS_FAIL,
        total_clients: data.total_clients,
        total_assessments: data.total_assessments,
        error: data.error,
        failed_at: data.failed_at
    };
};

export const startAssessment = (questionnaire, token, userId) => {
    return dispatch => {
        dispatch(startAssessmentStart());
        axios.post(`${apiURL}/api/assessments/start`, questionnaire, { params: { auth: token } })
            .then(response => {
                dispatch(startAssessmentSuccess(response.data.response));
                dispatch(fetchClients(token, "Active", userId, 5, 1))
            })
            .catch(error => {
                dispatch(startAssessmentFail(error.response.data));
            });
    };
};

export const updateAssessmentStart = () => {
    return {
        type: UPDATE_ASSESSMENT_START
    };
};

export const updateAssessmentSuccess = (updated_object) => {
    return {
        type: UPDATE_ASSESSMENT_SUCCESS,
        updated_object: updated_object
    };
};

export const updateAssessmentFail = () => {
    return {
        type: UPDATE_ASSESSMENT_FAIL
    };
};

export const updateAssessment = (auth, assessment_id, phase_number, updated_object) => {
    return dispatch => {
        dispatch(updateAssessmentStart());
        axios.put(`${apiURL}/api/assessments/update/${assessment_id}?number=${phase_number}`, updated_object, { params: { auth } })
            .then(response => {
                dispatch(updateAssessmentSuccess(response.data.response));
                if (phase_number === 4) {
                    dispatch(generateReport(auth, assessment_id))
                }
            })
            .catch(error => {
                dispatch(updateAssessmentFail());
            });
    };
};


export const uploadSummaryReportStart = () => {
    return {
        type: UPLOAD_SUMMARY_REPORT_START
    };
};

export const uploadSummaryReportSuccess = (updated_summary_report) => {
    return {
        type: UPLOAD_SUMMARY_REPORT_SUCCESS,
        updated_summary_report: updated_summary_report
    };
};

export const uploadSummaryReportFail = () => {
    return {
        type: UPLOAD_SUMMARY_REPORT_FAIL,
    };
};

export const uploadSummaryReport = (auth, assessment_id, updated_summary_report, status) => {
    return dispatch => {
        dispatch(uploadSummaryReportStart());
        axios.put(`${apiURL}/api/assessments/updateSummaryReport/${assessment_id}`, updated_summary_report, {
            params: {
                isRemove: false,
                status: status,
                auth
            }
        })
            .then(response => {
                dispatch(uploadSummaryReportSuccess(updated_summary_report));
            })
            .catch(error => {
                dispatch(uploadSummaryReportFail());
            });
    };
};

export const removeSummaryReportStart = () => {
    return {
        type: REMOVE_SUMMARY_REPORT_START
    };
};

export const removeSummaryReportSuccess = () => {
    return {
        type: REMOVE_SUMMARY_REPORT_SUCCESS
    };
};

export const removeSummaryReportFail = () => {
    return {
        type: REMOVE_SUMMARY_REPORT_FAIL,
    };
};

export const removeSummaryReport = (auth, assessment_id, empty_object, status) => {
    return dispatch => {
        dispatch(removeSummaryReportStart());
        axios.put(`${apiURL}/api/assessments/updateSummaryReport/${assessment_id}`, empty_object, {
            params: {
                isRemove: true,
                status: status,
                auth
            }
        })
            .then(response => {
                dispatch(removeSummaryReportSuccess())
            })
            .catch(error => {
                dispatch(removeSummaryReportFail());
            });
    };
};

export const fetchAssessmentStart = () => {
    return {
        type: FETCH_ASSESSMENT_START
    };
};

export const fetchAssessmentSuccess = (updatedObject) => {
    return {
        type: FETCH_ASSESSMENT_SUCCESS,
        assessment: updatedObject,
    };
};

export const fetchAssessmentFail = () => {
    return {
        type: FETCH_ASSESSMENT_FAIL,
    };
};

export const fetchAssessment = (auth, assessment_id, client_id) => {
    return dispatch => {
        dispatch(fetchAssessmentStart());
        axios.get(`${apiURL}/api/assessments/${assessment_id}?client_id=${client_id}`, { params: { auth } })
            .then(response => {
                dispatch(setCurrentTab(response.data.response.status === 6 ? 5 : response.data.response.status))
                dispatch(fetchAssessmentSuccess(response.data.response));
                dispatch(setIsSummaryReport(checkIfDefined(response.data.response.actigraphy_phase, false) ? response.data.response.actigraphy_phase.report !== undefined : false))
            })
            .catch(error => {
                dispatch(fetchAssessmentFail());
            });
    };
};


export const uploadAssessmentFileStart = () => {
    return {
        type: ASSESSMENT_FILE_UPLOAD_START
    };
};

export const uploadAssessmentFileSuccess = (updatedFiles) => {
    return {
        type: ASSESSMENT_FILE_UPLOAD_SUCCESS,
        updatedFiles: updatedFiles
    };
};

export const uploadAssessmentFileFail = () => {
    return {
        type: ASSESSMENT_FILE_UPLOAD_FAIL,
    };
};

export const uploadAssessmentFile = (auth, assessment_id, updatedFile, fileContext, fileName) => {
    return dispatch => {
        dispatch(uploadAssessmentFileStart());
        axios.post(`${apiURL}/api/assessments/uploadFile/${assessment_id}`, updatedFile,
            {
                params: { fileName, fileContext, auth }
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                //get object url and then update in assessment object in redux
                dispatch(uploadAssessmentFileSuccess(response.data.response));
            })
            .catch(error => {
                dispatch(uploadAssessmentFileFail());
            });
    };
};

export const removeAssessmentFileStart = () => {
    return {
        type: REMOVE_ASSESSMENT_FILE_START
    };
};

export const removeAssessmentFileSuccess = (updatedFiles, fileName) => {
    return {
        type: REMOVE_ASSESSMENT_FILE_SUCCESS,
        fileName: fileName,
        updatedFiles: updatedFiles
    };
};

export const removeAssessmentFileFail = () => {
    return {
        type: REMOVE_ASSESSMENT_FILE_FAIL
    };
};

export const removeAssessmentFile = (auth, assessment_id, fileName, fileKey) => {
    return dispatch => {
        dispatch(removeAssessmentFileStart());
        axios.delete(`${apiURL}/api/assessments/removeFile/${assessment_id}?fileName=${fileName}`, {
            params: {
                fileKey, auth
            }
        })
            .then(response => {
                dispatch(removeAssessmentFileSuccess(response.data.response, fileName));
            })
            .catch(error => {
                dispatch(removeAssessmentFileFail());
            });
    };
};

export const generateReportStart = () => {
    return {
        type: GENERATE_REPORT_START
    };
};

export const generateReportSuccess = (updatedFiles) => {
    return {
        type: GENERATE_REPORT_SUCCESS,
        updatedFiles: updatedFiles
    };
};

export const generateReportFail = () => {
    return {
        type: GENERATE_REPORT_FAIL,

    };
};

export const generateReport = (auth, assessment_id) => {
    return dispatch => {
        dispatch(generateReportStart());
        axios.put(`${apiURL}/api/assessments/generateReport/${assessment_id}?auth=${auth}`)
            .then(response => {
                dispatch(generateReportSuccess(response.data.response))
            })
            .catch(error => {
                dispatch(generateReportFail());
            });
    };
};

export const emailReportStart = () => {
    return {
        type: EMAIL_REPORT_START
    };
};

export const emailReportSuccess = () => {
    return {
        type: EMAIL_REPORT_SUCCESS
    };
};

export const emailReportFail = () => {
    return {
        type: EMAIL_REPORT_FAIL

    };
};

export const emailReport = (auth, assessment_id, emailAdress, message) => {
    const body = { message: message }
    return dispatch => {
        dispatch(emailReportStart());
        axios.put(`${apiURL}/api/assessments/emailReport/${assessment_id}`, body, {
            params: {
                emailAdress, auth
            }
        },
        )
            .then(response => {
                dispatch(emailReportSuccess(response.data.response))
            })
            .catch(error => {
                dispatch(emailReportFail());
            });
    };
};