import React, { useState, useRef, useEffect } from 'react'
import classes from './Assessment.module.css'
import AssessmentTab from '../../components/UI/AssessmentTab/AssessmentTab'
import Questionnaire from '../../components/AssessmentPhases/Questionnaire/Questionnaire'
import Consult from '../../components/AssessmentPhases/Consult/Consult'
import Actigram from '../../components/AssessmentPhases/Actigram/Actigram'
import DataAnalysis from '../../components/AssessmentPhases/DataAnalysis/DataAnalysis'
import ReportGeneration from '../../components/AssessmentPhases/ReportGeneration/ReportGeneration'
// import { useParams } from 'react-router-dom'
import * as actions from '../../store/actions/assessments'
import { connect } from 'react-redux';
import { checkIfDefined } from '../../shared/Utility'
import ProfileIcon from '../../Assets/Icons/profile icon.svg'
import SummaryAssessmentModal from '../../components/UI/Modals/SummaryAssessmentModal/SummaryAssessmentModal'
import Spinner from '../../components/UI/Spinner/Spinner'
import FeedbackGlobal from '../../components/UI/FeedbackGlobal/FeedbackGlobal'
import GeneralModal from '../../components/UI/Modals/GeneralModal/GeneralModal'
import { useNavigate } from 'react-router-dom'

const Assessment = (props) => {
    //if status > number then tab completed
    //if status < number then tab locked
    //if status = number then tab selected

    const [status, _setStatus] = useState(props.status)

    const statusRef = useRef(status)

    const setStatus = (val) => {
        statusRef.current = val
        _setStatus(val)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const [state, setState] = useState({
        tabs: {
            questionnaire: {
                title: "QUESTIONNAIRE",
                number: 1
            },
            consult: {
                title: "CONSULT",
                number: 2
            },
            actigram: {
                title: "ACTOGRAM",
                number: 3
            },
            dataAnalysis: {
                title: "DATA ANALYSIS",
                number: 4
            },
            reportGeneration: {
                title: "REPORT GENERATION",
                number: 5
            }
        },
        showModal: false
    })

    const tabs = Object.keys(state.tabs).map(key =>
    (
        <AssessmentTab
            key={key}
            title={state.tabs[key].title}
            isComplete={state.tabs[key].number < statusRef.current}
            isSelected={state.tabs[key].number === props.currentTab}
            phase_number={state.tabs[key].number}
            OnSetCurrentTab={props.OnSetCurrentTab}
            status={statusRef.current}
        />
    ))
    let content = null
    switch (props.currentTab) {
        case 1:
            content = (
                <Questionnaire
                    questionnaire_phase={checkIfDefined(props.assessment.questionnaire_phase, {})}
                    OnUpdateAssessment={props.OnUpdateAssessment}
                    loading={props.loading_saving_data}
                    OnSetCurrentTab={props.OnSetCurrentTab}
                    currentTab={props.currentTab}
                    assessment_id={props.assessment.id}
                    phase_number={1}
                    OnCacheQuestionnaireChanges={props.OnCacheQuestionnaireChanges}
                    showConfirmModal={props.showConfirmModalQuestionnaire}
                    OnSetConfirmModal={props.OnSetConfirmModalQuestionniare}
                    phaseComplete={props.phaseComplete}
                    OnSetPhaseComplete={props.OnSetPhaseComplete}
                    error={props.errors.updateAssessment}
                    OnSetAssessmentError={props.OnSetAssessmentError}
                    token={props.token}
                />
            )
            break;
        case 2:
            content = <Consult
                OnUpdateAssessment={props.OnUpdateAssessment}
                loading={props.loading_saving_data}
                consult_phase={checkIfDefined(props.assessment.consult_phase, {})}
                client_details={checkIfDefined(checkIfDefined(props.assessment.questionnaire_phase, {}).client_details, {})}
                assessment_id={props.assessment.id}
                OnSetCurrentTab={props.OnSetCurrentTab}
                phase_number={2}
                bmi={checkIfDefined(checkIfDefined(props.assessment.analysis_phase, {}).calculations, {}).bmi}
                showConfirmModal={props.showConfirmModalConsult}
                OnSetConfirmModal={props.OnSetConfirmModalConsult}
                phaseComplete={props.phaseComplete}
                OnSetPhaseComplete={props.OnSetPhaseComplete}
                OnSetUploadingConsultNotes={props.OnSetUploadingConsultNotes}
                uploadingConsultNotes={props.uploadingConsultNotes}
                uploadingFile={props.uploadingFile}
                OnUploadFile={props.OnUploadFile}
                status={props.assessment.status}
                error={props.errors.updateAssessment}
                OnSetAssessmentError={props.OnSetAssessmentError}
                consult_file={checkIfDefined(checkIfDefined(props.assessment.files, {}).consult_notes, undefined)}
                OnSetRemovingFileComplete={props.OnSetRemovingFileComplete}
                removingFileComplete={props.removingFileComplete}
                removingFile={props.removingFile}
                OnRemoveFile={props.OnRemoveFile}
                token={props.token}
                OnCacheConsultNotes={props.OnCacheConsultNotes}

            />
            break;
        case 3:
            content = <Actigram
                OnSetCurrentTab={props.OnSetCurrentTab}
                OnUpdateAssessment={props.OnUpdateAssessment}
                status={props.assessment.status}
                phase_number={3}
                assessment_id={props.assessment.id}
                actigraphy_phase={props.assessment.actigraphy_phase}
                loading={props.loading_saving_data}
                OnSetUploadingSummaryReport={props.OnSetUploadingSummaryReport}
                uploadingSummaryReport={props.uploadingSummaryReport}
                removingSummaryReport={props.removingSummaryReport}
                isSummaryReport={props.isSummaryReport}
                OnUploadFile={props.OnUploadFile}
                actigram_image={checkIfDefined(checkIfDefined(props.assessment.files, {}).actigram, undefined)}
                OnSetUploadingActigram={props.OnSetUploadingActigram}
                uploadingFile={props.uploadingFile}
                showConfirmModal={props.showConfirmModalActigram}
                OnSetConfirmModal={props.OnSetConfirmModalActigram}
                phaseComplete={props.phaseComplete}
                OnSetPhaseComplete={props.OnSetPhaseComplete}
                OnRemoveSummaryReport={props.OnRemoveSummaryReport}
                OnUploadSummaryReport={props.OnUploadSummaryReport}
                removingFile={props.removingFile}
                OnRemoveFile={props.OnRemoveFile}
                OnSetRemovingFileComplete={props.OnSetRemovingFileComplete}
                removingFileComplete={props.removingFileComplete}
                error={props.errors.updateAssessment}
                OnSetAssessmentError={props.OnSetAssessmentError}
                token={props.token}
            />
            break;
        case 4:
            content = <DataAnalysis
                OnSetCurrentTab={props.OnSetCurrentTab}
                OnUpdateAssessment={props.OnUpdateAssessment}
                phase_number={4}
                assessment_id={props.assessment.id}
                analysis_phase={checkIfDefined(props.assessment.analysis_phase, {})}
                loading={props.loading_saving_data}
                questionnaire_phase={props.assessment.questionnaire_phase}
                showConfirmModal={props.showConfirmModalAnalysis}
                OnSetConfirmModal={props.OnSetConfirmModalAnalysis}
                phaseComplete={props.phaseComplete}
                OnSetPhaseComplete={props.OnSetPhaseComplete}
                updateError={props.errors.updateAssessment}
                reportError={props.errors.reportGeneration}
                OnSetAssessmentError={props.OnSetAssessmentError}
                OnGenerateReport={props.OnGenerateReport}
                generating={props.generatingReport}
                reportGenerated={props.reportGenerated}
                token={props.token}
            />
            break;
        case 5:
            content = <ReportGeneration
                phase_number={5}
                report={checkIfDefined(checkIfDefined(props.assessment.files, {}).final_report, undefined)}
                error={props.errors.reportGeneration}
                emailError={props.errors.emailReport}
                OnSetEmailReportModal={props.OnSetEmailReportModal}
                showEmailReportModal={props.showEmailReportModal}
                client_details={checkIfDefined(checkIfDefined(checkIfDefined(props.assessment, {}).questionnaire_phase, {}).client_details, {})}
                OnEmailReport={props.OnEmailReport}
                assessment_id={checkIfDefined(checkIfDefined(props.assessment, {}).id, {})}
                sendingEmail={props.sendingEmail}
                sendingEmailComplete={props.sendingEmailComplete}
                OnSetAssessmentError={props.OnSetAssessmentError}
                token={props.token}
            />
            break;
        default:
            break;
    }

    const history = useNavigate();

    const onCloseHandler = () => {
        props.OnSetConfirmModalAssessment(false)
        history.push("/clients");
    }

    return (
        <>
            <SummaryAssessmentModal
                show={state.showModal}
                close={() => setState({ ...state, showModal: false })}
            />
            {!props.loading && !props.errors.fetchAssessment ? <div className={classes.Container}>
                <div className={classes.Header}>
                    <div className={classes.Dropdown}>
                        <select>
                            <option value="1">Assessment 1</option>
                            {/* this needs to be automatic based on the number of the assessments for a client */}
                        </select>
                        <span onClick={() => setState({ ...state, showModal: true })}>Summary of assessment</span>
                    </div>
                    <div className={classes.ClientInfo}>
                        <h4>{checkIfDefined(checkIfDefined(props.assessment.questionnaire_phase, {}).client_details, {}).fullname}</h4>
                        <div className={classes.ProfileImage}>
                            <img src={ProfileIcon} alt="profile icon" />
                        </div>
                    </div>
                </div>
                <div className={classes.TabNavigation}>
                    {tabs}
                </div>
                <div>
                    {content}
                </div>
            </div> :
                !props.errors.fetchAssessment
                    ? <Spinner loadingMessage="Catching up on sleep..." calledLocation="Assessment" /> :
                    <GeneralModal
                        show={props.showConfirmModalAssessment}
                        close={onCloseHandler}
                        removeHeading={props.errors.fetchAssessment}
                    >{<FeedbackGlobal type="Fail" OnSetAssessmentError={onCloseHandler} cancelError={onCloseHandler} errorLocation={"Assessment"} />}
                    </GeneralModal>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        showStartAssessmentModal: state.clients.showStartAssessmentModal,
        assessment: state.assessments.assessment,
        loading: state.assessments.loading,
        loading_saving_data: state.assessments.loading_saving_data,
        currentTab: state.assessments.currentTab,
        uploadingSummaryReport: state.assessments.uploadingSummaryReport,
        removingSummaryReport: state.assessments.removingSummaryReport,
        status: state.assessments.status,
        isSummaryReport: state.assessments.isSummaryReport,
        assessmentFiles: state.assessments.assessmentFiles,
        uploadingFile: state.assessments.uploadingFile,
        generatingReport: state.assessments.generatingReport,
        showConfirmModalQuestionnaire: state.assessments.showConfirmModalQuestionnaire,
        showConfirmModalConsult: state.assessments.showConfirmModalConsult,
        showConfirmModalActigram: state.assessments.showConfirmModalActigram,
        showConfirmModalAnalysis: state.assessments.showConfirmModalAnalysis,
        showConfirmModalAssessment: state.assessments.showConfirmModalAssessment,
        phaseComplete: state.assessments.phaseComplete,
        removingFile: state.assessments.removingFile,
        uploadingConsultNotes: state.assessments.uploadingConsultNotes,
        removingFileComplete: state.assessments.removingFileComplete,
        errors: state.assessments.errors,
        showEmailReportModal: state.assessments.showEmailReportModal,
        sendingEmail: state.assessments.sendingEmail,
        sendingEmailComplete: state.assessments.sendingEmailComplete,
        reportGenerated: state.assessments.reportGenerated,
        token: state.auth.token,
    };
}
//can access these function to dispatch actions - via props
const mapDispatchToProps = dispatch => {
    return {
        // OnStartAssessment: (questionnaire) => dispatch(actions.startAssessment(questionnaire)),
        OnSetCurrentTab: (tab) => dispatch(actions.setCurrentTab(tab)),
        OnSetUploadingSummaryReport: () => dispatch(actions.setUploadingSummaryReport()),
        OnUpdateAssessment: (token, assessment_id, phase_number, updated_object) => dispatch(actions.updateAssessment(token, assessment_id, phase_number, updated_object)),
        OnCacheQuestionnaireChanges: (updated_object, section) => dispatch(actions.cacheQuestionnaireChanges(updated_object, section)),
        OnUploadFile: (token, assessment_id, updated_files, fileContext, fileName) => dispatch(actions.uploadAssessmentFile(token, assessment_id, updated_files, fileContext, fileName)),
        OnRemoveFile: (token, assessment_id, fileName, fileKey) => dispatch(actions.removeAssessmentFile(token, assessment_id, fileName, fileKey)),
        OnSetUploadingActigram: () => dispatch(actions.setUploadingActigram()),

        OnSetConfirmModalQuestionniare: (val) => dispatch(actions.setConfirmModalQuestionnaire(val)),
        OnSetConfirmModalConsult: (val) => dispatch(actions.setConfirmModalConsult(val)),
        OnSetConfirmModalActigram: (val) => dispatch(actions.setConfirmModalActigram(val)),
        OnSetConfirmModalAnalysis: (val) => dispatch(actions.setConfirmModalAnalysis(val)),
        OnSetConfirmModalAssessment: (val) => dispatch(actions.setConfirmModalAssessment(val)),
        OnSetEmailReportModal: (val) => dispatch(actions.setEmailReportModal(val)),


        OnSetPhaseComplete: (val) => dispatch(actions.setPhaseComplete(val)),
        OnRemoveSummaryReport: (token, assessment_id, empty_object, status) => dispatch(actions.removeSummaryReport(token, assessment_id, empty_object, status)),
        OnUploadSummaryReport: (token, assessment_id, updated_summary_report, status) => dispatch(actions.uploadSummaryReport(token, assessment_id, updated_summary_report, status)),
        OnSetRemovingFileComplete: (val) => dispatch(actions.setRemovingFileComplete(val)),

        OnSetUploadingConsultNotes: (val) => dispatch(actions.setUploadingConsultNotes(val)),

        OnSetAssessmentError: (name, val) => dispatch(actions.setAssessmentError(name, val)),
        OnGenerateReport: (token, assessment_id) => dispatch(actions.generateReport(token, assessment_id)),
        OnEmailReport: (token, assessment_id, emailAddress, message) => dispatch(actions.emailReport(token, assessment_id, emailAddress, message)),
        OnCacheConsultNotes: (notes) => dispatch(actions.cacheConsultNotes(notes))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment)