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
} from '../actions/actionTypes';
import { updateObject, checkIfDefined } from '../../shared/Utility'
const clone = require('rfdc')()

const initialState = {
    loading: false,
    assessment: {},
    currentAssessmentID: 0,
    currentTab: 1,
    uploadingSummaryReport: false,
    status: 0,
    isSummaryReport: false,
    uploadingFile: false,
    generatingReport: false,
    showConfirmModalQuestionnaire: false,
    showConfirmModalConsult: false,
    showConfirmModalActigram: false,
    showConfirmModalAnalysis: false,
    showConfirmModalAssessment: false,
    loading_saving_data: false,
    loading_start_assessment: false,
    loading_processing: false,
    start_assessment_file: "",
    fileProcessingComplete: false,
    showStartAssessmentModal: false,
    phaseComplete: false,
    removingSummaryReport: false,
    removingFile: false,
    uploadingConsultNotes: false,
    removingFileComplete: false,
    startAssessmentComplete: false,
    startAssessmentConfirmModal: false,
    totalClients: 0,
    totalAssessments: 0,
    failedAt: "",
    errors: {
        fetchAssessment: false,
        updateAssessment: false,
        reportGeneration: false,
        startAssessment: null,
        emailReport: false
    },
    showEmailReportModal: false,
    sendingEmail: false,
    sendingEmailComplete: false,
    reportGenerated: false
}

const cacheConsultNotes = (state, action) => {
    let assessmentCopy = clone(state.assessment)
    if(checkIfDefined(assessmentCopy["consult_phase"], false)){
        assessmentCopy["consult_phase"]["notes"] = action.notes
    }else{
        assessmentCopy["consult_phase"] = {"notes": action.notes}
    }

    return updateObject(state, {
        assessment: assessmentCopy,
    })
}

const setEmailReportModal = (state, action) => {
    return updateObject(state, {
        showEmailReportModal: action.val,
        sendingEmailComplete: false,
        errors: { ...state.errors, emailReport: false },
        sendingEmail: false
    })
}

const setStartAssessmentConfirmModal = (state, action) => {
    return updateObject(state, {
        startAssessmentConfirmModal: action.val,
        errors: { ...state.errors, startAssessment: null }
    })
}

const setStartAssessmentComplete = (state, action) => {
    return updateObject(state, {
        startAssessmentComplete: action.val
    })
}
const setUploadingConsultNotes = (state, action) => {
    return updateObject(state, {
        uploadingConsultNotes: action.val
    })
}

const setStartAssessmentModal = (state, action) => {
    if (!action.value) {
        return updateObject(state, {
            showStartAssessmentModal: action.val,
            fileProcessingComplete: false,
            loading_processing: false,
            loading_start_assessment: false,
            start_assessment_file: ""
        });
    }
    return updateObject(state, {
        showStartAssessmentModal: action.val
    });
};

const setProcessingXLSXCSV = (state, action) => {
    let tempFileName = checkIfDefined(action.fileName, state.start_assessment_file)
    return updateObject(state, {
        loading_processing: action.val,
        start_assessment_file: tempFileName,
        fileProcessingComplete: action.isComplete
    })
}

const setConfirmModalQuestionnaire = (state, action) => {
    return updateObject(state, {
        showConfirmModalQuestionnaire: action.val,
        errors: { ...state.errors, updateAssessment: false }
    })
}
const setConfirmModalConsult = (state, action) => {
    return updateObject(state, {
        showConfirmModalConsult: action.val,
        errors: { ...state.errors, updateAssessment: false }
    })
}
const setConfirmModalActigram = (state, action) => {
    return updateObject(state, {
        showConfirmModalActigram: action.val,
        errors: { ...state.errors, updateAssessment: false }
    })
}
const setConfirmModalAnalysis = (state, action) => {
    return updateObject(state, {
        showConfirmModalAnalysis: action.val,
        errors: { ...state.errors, updateAssessment: false, reportGeneration: false },
        reportGenerated: false,
        phaseComplete: false
    })
}

const setConfirmModalAssessment = (state, action) => {
    return updateObject(state, {
        showConfirmModalAssessment: action.val,
        errors: { ...state.errors, fetchAssessment: false }
    })
}

const setPhaseComplete = (state, action) => {
    return updateObject(state, {
        phaseComplete: action.val
    })
}

const setRemovingFileComplete = (state, action) => {
    return updateObject(state, {
        removingFileComplete: action.val
    })
}

const setIsSummaryReport = (state, action) => {
    return updateObject(state, {
        isSummaryReport: action.val
    })
}

const cacheQuestionnaireChanges = (state, action) => {
    let assessmentCopy = clone(state.assessment) //creating a deap copy of the assessment state
    assessmentCopy["questionnaire_phase"] = { ...assessmentCopy["questionnaire_phase"], ...action.updated_object }
    return updateObject(state, {
        assessment: assessmentCopy
    })
}

const uploadingSummaryReport = (state, action) => {
    return updateObject(state, {
        uploadingSummaryReport: action.val
    })
}

const uploadingActigram = (state, action) => {
    return updateObject(state, {
        uploadingFile: true
    })
}

const setCurrentTab = (state, action) => {
    return updateObject(state, {
        currentTab: action.phase_number,
        phaseComplete: false
    })
}

const setCurrrentAssessmentID = (state, action) => {
    return updateObject(state, {
        currentAssessmentID: action.id
    })
}

const setAssessmentError = (state, action) => {
    return updateObject(state, {
        errors: { ...state.errors, [action.name]: action.val }
    })
}

const deleteAssessmentStart = (state, action) => {
    return updateObject(state, {

    });
}

const deleteAssessmentSuccess = (state, action) => {
    return updateObject(state, {

    });
}

const deleteAssessmentFail = (state, action) => {
    return updateObject(state, {

    });
}

const startAssessmentStart = (state, action) => {

    return updateObject(state, {
        loading_start_assessment: true,
        startAssessmentComplete: false,
        failedAt: "",
        totalClients: action.total_clients,
        totalAssessments: action.total_assessments,
        errors: { ...state.errors, startAssessment: null }
    });
}

const startAssessmentSuccess = (state, action) => {
    return updateObject(state, {
        loading_start_assessment: false,
        start_assessment_file: "",
        startAssessmentComplete: true,
        totalClients: action.total_clients,
        totalAssessments: action.total_assessments,
        errors: { ...state.errors, startAssessment: null },
        failedAt: null
    });
}

const startAssessmentFail = (state, action) => {
    return updateObject(state, {
        loading_start_assessment: false,
        startAssessmentComplete: false,
        totalClients: action.total_clients,
        totalAssessments: action.total_assessments,
        errors: { ...state.errors, startAssessment: action.error },
        failedAt: action.failed_at
    });
}

const updateAssessmentStart = (state, action) => {
    return updateObject(state, {
        loading_saving_data: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const updateAssessmentSuccess = (state, action) => {
    let assessmentCopy = clone(state.assessment) //creating a deap copy of the assessment state
    const key = Object.keys(action.updated_object)
    let status = 0
    switch (key[0]) {
        case "questionnaire_phase":
            assessmentCopy["questionnaire_phase"] = { ...assessmentCopy["questionnaire_phase"], ...action.updated_object.questionnaire_phase }
            assessmentCopy["analysis_phase"] = { ...assessmentCopy["analysis_phase"], ...action.updated_object.analysis_phase }
            assessmentCopy["status"] = action.updated_object.status
            status = action.updated_object.status
            break;
        case "consult_phase":
            assessmentCopy["consult_phase"] = action.updated_object.consult_phase
            assessmentCopy["status"] = action.updated_object.status
            status = action.updated_object.status
            break;
        case "actigraphy_phase":
            assessmentCopy["actigraphy_phase"] = { ...assessmentCopy["actigraphy_phase"], ...action.updated_object.actigraphy_phase }
            assessmentCopy["analysis_phase"] = { ...assessmentCopy["analysis_phase"], ...action.updated_object.analysis_phase }
            assessmentCopy["status"] = action.updated_object.status
            status = action.updated_object.status
            break;
        case "analysis_phase":
            assessmentCopy["analysis_phase"] = { ...assessmentCopy["analysis_phase"], ...action.updated_object.analysis_phase }
            assessmentCopy["status"] = action.updated_object.status
            status = action.updated_object.status
            break;
        default:
            break;
    }

    return updateObject(state, {
        loading_saving_data: false,
        assessment: assessmentCopy,
        status: status,
        phaseComplete: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const updateAssessmentFail = (state, action) => {
    return updateObject(state, {
        loading_saving_data: false,
        phaseComplete: false,
        errors: { ...state.errors, updateAssessment: true }
    });
}

const uploadSummaryReportStart = (state, action) => {
    return updateObject(state, {
        uploadingSummaryReport: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const uploadSummaryReportSuccess = (state, action) => {
    const assessmentCopy = clone(state.assessment)
    assessmentCopy["actigraphy_phase"] = { ...assessmentCopy["actigraphy_phase"], report: action.updated_summary_report }
    return updateObject(state, {
        uploadingSummaryReport: false,
        assessment: assessmentCopy,
        isSummaryReport: true,
        phaseComplete: false,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const uploadSummaryReportFail = (state, action) => {
    return updateObject(state, {
        uploadingSummaryReport: false,
        errors: { ...state.errors, updateAssessment: true }
    });
}

const removeSummaryReportStart = (state, action) => {
    return updateObject(state, {
        removingSummaryReport: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const removeSummaryReportSuccess = (state, action) => {
    const assessmentCopy = clone(state.assessment)
    assessmentCopy["actigraphy_phase"] = { ...assessmentCopy["actigraphy_phase"], report: {} }
    assessmentCopy["status"] = 3
    console.log(assessmentCopy)
    return updateObject(state, {
        removingSummaryReport: false,
        assessment: assessmentCopy,
        isSummaryReport: false,
        removingFileComplete: true,
        status: 3,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const removeSummaryReportFail = (state, action) => {
    return updateObject(state, {
        removingSummaryReport: false,
        errors: { ...state.errors, updateAssessment: true }
    });
}

const fetchAssessmentStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        errors: { ...state.errors, fetchAssessment: false }
    });
}

const fetchAssessmentSuccess = (state, action) => {
    let assessmentCopy = clone(action.assessment)
    if( checkIfDefined(checkIfDefined(assessmentCopy.questionnaire_phase.sleep_history, {}).symptoms, undefined)) {
        let sleep_history_symptoms = assessmentCopy.questionnaire_phase.sleep_history.symptoms
        let symptoms = ""
        for (let symptom in sleep_history_symptoms) {
            if (sleep_history_symptoms[symptom] === "Yes") {
                symptoms += `${symptom}; `
            } 
        }
        symptoms = symptoms.replace(/;\s*$/, "");
        symptoms =  symptoms === "" ? "Unanswered" : symptoms
        assessmentCopy.questionnaire_phase.sleep_history.symptoms = symptoms
    }

    let value = checkIfDefined(assessmentCopy.actigraphy_phase, false) ? (assessmentCopy.actigraphy_phase.report !== undefined || assessmentCopy.actigraphy_phase.report !== null || Object.keys(state.assessment.actigraphy_phase).length !== 0) : false

    return updateObject(state, {
        loading: false,
        assessment: assessmentCopy,
        status: assessmentCopy.status,
        phaseComplete: false,
        isSummaryReport: value,
        errors: { ...state.errors, fetchAssessment: false }
    });
}

const fetchAssessmentFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        errors: { ...state.errors, fetchAssessment: true },
        showConfirmModalAssessment: true
    });
}

const uploadAssessmentFileStart = (state, action) => {
    return updateObject(state, {
        uploadingFile: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const uploadAssessmentFileSuccess = (state, action) => {
    let assessmentCopy = clone(state.assessment) //creating a deap copy of the assessment state
    assessmentCopy["files"] = action.updatedFiles

    return updateObject(state, {
        assessment: assessmentCopy,
        uploadingFile: false,
        phaseComplete: false,
        loading_upload_consult: false,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const uploadAssessmentFileFail = (state, action) => {
    return updateObject(state, {
        uploadingFile: false,
        errors: { ...state.errors, updateAssessment: true }
    });
}

const removeAssessmentFileStart = (state, action) => {
    return updateObject(state, {
        removingFile: true,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const removeAssessmentFileSuccess = (state, action) => {
    let assessmentCopy = clone(state.assessment) //creating a deap copy of the assessment state
    assessmentCopy["files"] = action.updatedFiles

    return updateObject(state, {
        assessment: assessmentCopy,
        removingFile: false,
        removingFileComplete: true,
        status: action.fileName === "actigram" ? 3 : state.assessment.status,
        errors: { ...state.errors, updateAssessment: false }
    });
}

const removeAssessmentFileFail = (state, action) => {
    return updateObject(state, {
        removingFile: false,
        errors: { ...state.errors, updateAssessment: true }
    });
}

const generateReportStart = (state, action) => {

    return updateObject(state, {
        generatingReport: true,
        errors: { ...state.errors, reportGeneration: false }
    });
}

const generateReportSuccess = (state, action) => {
    const assessmentCopy = clone(state.assessment)
    assessmentCopy['files'] = action.updatedFiles
    assessmentCopy['status'] = 6
    return updateObject(state, {
        generatingReport: false,
        assessment: assessmentCopy,
        errors: { ...state.errors, reportGeneration: false },
        status: 6,
        reportGenerated: true
    });
}

const generateReportFail = (state, action) => {
    return updateObject(state, {
        generatingReport: false,
        errors: { ...state.errors, reportGeneration: true },
        reportGenerated: false
    });
}

const emailReportStart = (state, action) => {
    return updateObject(state, {
        sendingEmail: true,
        errors: { ...state.errors, emailReport: false }
    });
}

const emailReportSuccess = (state, action) => {
    return updateObject(state, {
        sendingEmail: false,
        sendingEmailComplete: true,
        errors: { ...state.errors, emailReport: false },
    });
}

const emailReportFail = (state, action) => {
    return updateObject(state, {
        sendingEmail: false,
        errors: { ...state.errors, emailReport: true }
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CACHE_CONSULT_NOTES: return cacheConsultNotes(state, action)
        case SET_EMAIL_REPORT_MODAL: return setEmailReportModal(state, action)
        case SET_START_ASSESSMENT_CONFIRM_MODAL: return setStartAssessmentConfirmModal(state, action)
        case SET_START_ASSESSMENT_COMPLETE: return setStartAssessmentComplete(state, action)
        case SET_UPLOADING_CONSULT_NOTES: return setUploadingConsultNotes(state, action)

        case REMOVE_ASSESSMENT_FILE_START: return removeAssessmentFileStart(state, action)
        case REMOVE_ASSESSMENT_FILE_SUCCESS: return removeAssessmentFileSuccess(state, action)
        case REMOVE_ASSESSMENT_FILE_FAIL: return removeAssessmentFileFail(state, action)

        case UPLOAD_SUMMARY_REPORT_START: return uploadSummaryReportStart(state, action)
        case UPLOAD_SUMMARY_REPORT_SUCCESS: return uploadSummaryReportSuccess(state, action)
        case UPLOAD_SUMMARY_REPORT_FAIL: return uploadSummaryReportFail(state, action)
        case REMOVE_SUMMARY_REPORT_START: return removeSummaryReportStart(state, action)
        case REMOVE_SUMMARY_REPORT_SUCCESS: return removeSummaryReportSuccess(state, action)
        case REMOVE_SUMMARY_REPORT_FAIL: return removeSummaryReportFail(state, action)

        case SET_START_ASSESSMENT_MODAL: return setStartAssessmentModal(state, action)
        case SET_CONFIRM_MODAL_QUESTIONNAIRE: return setConfirmModalQuestionnaire(state, action)
        case SET_CONFIRM_MODAL_CONSULT: return setConfirmModalConsult(state, action)
        case SET_CONFIRM_MODAL_ACTIGRAM: return setConfirmModalActigram(state, action)
        case SET_CONFIRM_MODAL_ANALYSIS: return setConfirmModalAnalysis(state, action)
        case SET_CONFIRM_MODAL_ASSESSMENT: return setConfirmModalAssessment(state, action)

        case SET_PHASE_COMPLETE: return setPhaseComplete(state, action)
        case SET_REMOVING_FILE_COMPLETE: return setRemovingFileComplete(state, action)
        case SET_PROCESSING_XLSX_CSV: return setProcessingXLSXCSV(state, action)
        case SET_IS_SUMMARY_REPORT: return setIsSummaryReport(state, action)
        case CACHE_QUESTIONNAIRE_CHANGES: return cacheQuestionnaireChanges(state, action)
        case SET_UPLOADING_SUMMARY_REPORT: return uploadingSummaryReport(state, action)
        case SET_UPLOADING_ACTIGRAM: return uploadingActigram(state, action)
        case SET_CURRENT_TAB: return setCurrentTab(state, action)
        case SET_CURRENT_ASSESSMENT_ID: return setCurrrentAssessmentID(state, action)
        case SET_ASSESSMENT_ERROR: return setAssessmentError(state, action)
        case DELETE_ASSESSMENT_START: return deleteAssessmentStart(state, action)
        case DELETE_ASSESSMENT_SUCCESS: return deleteAssessmentSuccess(state, action)
        case DELETE_ASSESSMENT_FAIL: return deleteAssessmentFail(state, action)
        case START_ASSESSMENTS_START: return startAssessmentStart(state, action)
        case START_ASSESSMENTS_SUCCESS: return startAssessmentSuccess(state, action)
        case START_ASSESSMENTS_FAIL: return startAssessmentFail(state, action)
        case UPDATE_ASSESSMENT_START: return updateAssessmentStart(state, action)
        case UPDATE_ASSESSMENT_SUCCESS: return updateAssessmentSuccess(state, action)
        case UPDATE_ASSESSMENT_FAIL: return updateAssessmentFail(state, action)
        case FETCH_ASSESSMENT_START: return fetchAssessmentStart(state, action)
        case FETCH_ASSESSMENT_SUCCESS: return fetchAssessmentSuccess(state, action)
        case FETCH_ASSESSMENT_FAIL: return fetchAssessmentFail(state, action)
        case ASSESSMENT_FILE_UPLOAD_START: return uploadAssessmentFileStart(state, action)
        case ASSESSMENT_FILE_UPLOAD_SUCCESS: return uploadAssessmentFileSuccess(state, action)
        case ASSESSMENT_FILE_UPLOAD_FAIL: return uploadAssessmentFileFail(state, action)
        case GENERATE_REPORT_START: return generateReportStart(state, action)
        case GENERATE_REPORT_SUCCESS: return generateReportSuccess(state, action)
        case GENERATE_REPORT_FAIL: return generateReportFail(state, action)
        case EMAIL_REPORT_START: return emailReportStart(state, action)
        case EMAIL_REPORT_SUCCESS: return emailReportSuccess(state, action)
        case EMAIL_REPORT_FAIL: return emailReportFail(state, action)

        default:
            return state;
    }
};

export default reducer;