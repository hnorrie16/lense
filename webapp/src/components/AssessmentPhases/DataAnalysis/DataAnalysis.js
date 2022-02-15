import React, { useState, useRef, useEffect } from 'react'
import classes from './DataAnalysis.module.css'
import SectionTab from './SectionTab/SectionTab'
import ClientDetails from '../../DataAnalysisForms/ClientDetails/ClientDetails'
import SleepProfile from '../../DataAnalysisForms/SleepProfile/SleepProfile'
import SleepHistory from '../../DataAnalysisForms/SleepHistory/SleepHistory'
import MedicalHistory from '../../DataAnalysisForms/MedicalHistory/MedicalHistory'
import LifestyleFactors from '../../DataAnalysisForms/LifestyleFactors/LifestyleFactors'
import InterpretationForm from '../../InterpretationForm/InterpretationForm'
import { useFormik } from 'formik';
import { checkIfDefined } from '../../../shared/Utility'
import PreviousSaveButtons from '../../UI/PreviousSaveButtons/PreviousSaveButtons'
import ConfirmModal from '../../UI/Modals/ConfirmModal/ConfirmModal'
import Spinner from '../../UI/Spinner/Spinner'
import Feedback from '../../UI/Feedback/Feedback'
import FeedbackGlobal from '../../UI/FeedbackGlobal/FeedbackGlobal'
import Button from '../../UI/Button/Button'
import * as Yup from "yup";
import ValidationErrorModal from '../../UI/Modals/ValidationErrorModal/ValidationErrorModal'

const DataAnalysis = (props) => {
    const [state, _setState] = useState({
        selected: "Client details",
        showValidationModal: false
    })

    let stateRef = useRef(state)

    const setState = (data) => {
        stateRef.current = data;
        _setState(data);
    }

    const setSelectedSection = (title) => {
        setState({ ...state, selected: title })
    }

    let commonRisksFormat = "Insomnia: \nSleep-related breathing disorders: \nNarcolepsy: \nRestless leg syndrome: \nBruxism: "

    const formikInterpretation = useFormik({
        initialValues: {
            primary_complaint: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).primary_complaint, ""),
            medical_history: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).medical_history, ""),
            current_medication: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).current_medication, ""),
            risk_disorders: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).risk_disorders, commonRisksFormat),
            sleep_assessment: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).sleep_assessment, ""),
            way_forward: checkIfDefined(checkIfDefined(props.analysis_phase.interpretation, {}).way_forward, "")
        },
        validationSchema: Yup.object({
            primary_complaint: Yup.string()
                .required("This field is required"),
            medical_history: Yup.string()
                .required("This field is required"),
            current_medication: Yup.string()
                .required("This field is required"),
            risk_disorders: Yup.string()
                .required("This field is required"),
            sleep_assessment: Yup.string()
                .required("This field is required"),
            way_forward: Yup.string()
                .required("This field is required")
        }),
        onSubmit: values => {
            console.log("submit")
            alert(JSON.stringify(values, null, 2));
        }
    });

    const sections = [
        "Client details",
        "Sleep profile",
        "Sleep History",
        "Medical history",
        "Lifestyle factors"].map(title =>
        (
            <SectionTab
                key={title}
                title={title}
                isSelected={title === stateRef.current.selected}
                setSelectedSection={setSelectedSection}
            />
        ))

    let form = null

    switch (stateRef.current.selected) {
        case "Client details":
            form = <ClientDetails
                client_details={props.questionnaire_phase.client_details}
                bmi={checkIfDefined(checkIfDefined(props.analysis_phase, {}).calculations, {}).bmi}
            />
            break;
        case "Sleep profile":
            form = <SleepProfile
                calculations={checkIfDefined(checkIfDefined(props.analysis_phase, {}).calculations, {})}
            />
            break;
        case "Sleep History":
            form = <SleepHistory
                sleep_history={props.questionnaire_phase.sleep_history}
                lifestyle_factors={props.questionnaire_phase.lifestyle_factors}
            />
            break;
        case "Medical history":
            form = <MedicalHistory
                medical_history={props.questionnaire_phase.medical_history}
            />
            break;
        case "Lifestyle factors":
            form = <LifestyleFactors
                lifestyle_factors={props.questionnaire_phase.lifestyle_factors}
            />;
            break
        default:
            form = <ClientDetails
                client_details={props.questionnaire_phase.client_details}
            />
            break;
    }

    const onSaveHandler = async () => {
        props.OnUpdateAssessment(props.token, props.assessment_id, props.phase_number, { analysis_phase: { calculations: props.analysis_phase.calculations, interpretation: formikInterpretation.values } })
    }

    // if (!props.loading && props.phaseComplete) {
    //     setTimeout(() => {
    //         // props.OnSetCurrentTab(props.phase_number + 1) 
    //         // props.OnSetConfirmModal(false)
    //         // props.OnSetPhaseComplete(false)
    //         // props.OnGenerateReport(props.assessment_id)
    //     }, 2000)
    // }

    if (!props.generating && props.reportGenerated) {
        setTimeout(() => {
            props.OnSetCurrentTab(props.phase_number + 1)
            props.OnSetConfirmModal(false)
            props.OnSetPhaseComplete(false)
        }, 2000)
    }

    const cancelError = () => {
        props.OnSetConfirmModal(false)
    }

    const checkValidity = () => {
        //set all inputs to touched
        const touched = Object.keys(formikInterpretation.initialValues).reduce((result, item) => {
            result[item] = true;
            return result;
        }, {});
        // Touch all fields without running validations
        formikInterpretation.setTouched(touched, false);
        formikInterpretation.setSubmitting(true);

        //validating the forms
        formikInterpretation
            .validateForm()
            .then((formErrors) => {
                console.log(formErrors)
                formikInterpretation.setSubmitting(false);
                if (Object.keys(formErrors).length === 0) props.OnSetConfirmModal(true)
                else {
                    setState({ ...state, showValidationModal: true })
                }
            })
            .catch((err) => {
                formikInterpretation.setSubmitting(false);
            });
    }
    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    return (
        <>
            <ConfirmModal
                show={props.showConfirmModal}
                close={() => props.OnSetConfirmModal(false)}
                removeHeading={props.reportGenerated}
            > {props.loading || props.generating
                ? <Spinner calledLocation="DataAnalysis" loadingMessage="Saving and generating report..." />
                : props.reportGenerated
                    ? <Feedback type="Success" />
                    : props.updateError
                        ? <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                        : props.reportError ? <FeedbackGlobal type="Fail" error={"Error with generating report!"} errorLocation = {"reportGeneration"} OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError}/>
                            : <><p>By clicking confirm you are agreeing to <strong>save your changes</strong>, complete the <strong>Data Analysis phase</strong> and continue to the <strong>Generate Report phase.</strong></p>
                                <div className={classes.ButtonGroup}>
                                    <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                    <Button buttonType={"primary"} clicked={onSaveHandler}>Confirm</Button>
                                </div> </>
                }
            </ConfirmModal>

            <ValidationErrorModal
                show={state.showValidationModal}
                close={() => setState({ ...state, showValidationModal: false })}
            >
            </ValidationErrorModal>

            <div className={classes.Container}>
                <div className={classes.TopContainer}>
                    <div className={classes.Header}>
                        <h5>Data overview</h5>
                        <li className={classes.LineRule}></li>
                        <PreviousSaveButtons
                            OnPrevious={() => props.OnSetCurrentTab(3)}
                            OnSave={checkValidity}
                            phase={"analysis"}
                        />
                    </div>
                    <div className={classes.DataOverviewContainer}>
                        <ul className={classes.SectionsContainer}>
                            {sections}
                        </ul>
                        <div className={classes.ViewContainer}>
                            {form}
                        </div>
                    </div>

                </div>
                <div className={classes.RightContainer}>
                    <div className={classes.Header}>
                        <h5>Interpretation</h5>
                        <li className={classes.LineRule}></li>
                    </div>
                    <div className={classes.FormContainer}>
                        <InterpretationForm
                            formik={formikInterpretation}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default DataAnalysis