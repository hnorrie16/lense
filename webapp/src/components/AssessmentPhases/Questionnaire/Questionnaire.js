import React, { useState, useRef, useEffect } from 'react'
import classes from './Questionnaire.module.css'
import SectionTab from './SectionTab/SectionTab'
import AboutYou from '../../QuestionnaireForms/AboutYou/AboutYou'
import SleepHistory from '../../QuestionnaireForms/SleepHistory/SleepHistory'
import EpworthScale from '../../QuestionnaireForms/EpworthScale/EpworthScale'
import FatigueScale from '../../QuestionnaireForms/FatigueScale/FatigueScale'
import InsomniaIndex from '../../QuestionnaireForms/InsomniaIndex/InsomniaIndex'
import MedicalHistory from '../../QuestionnaireForms/MedicalHistory/MedicalHistory'
import LifestyleFactors from '../../QuestionnaireForms/LifestyleFactors/LifestyleFactors'
import { checkIfDefined } from '../../../shared/Utility'
import PreviousSaveButtons from '../../UI/PreviousSaveButtons/PreviousSaveButtons'
import ConfirmModal from '../../UI/Modals/ConfirmModal/ConfirmModal'
import Spinner from '../../UI/Spinner/Spinner'
import Feedback from '../../UI/Feedback/Feedback'
import Button from '../../UI/Button/Button'
import { useFormik } from 'formik';
import * as Yup from "yup";
import ValidationErrorModal from '../../UI/Modals/ValidationErrorModal/ValidationErrorModal'
const clone = require('rfdc')()

const Questionnaire = (props) => {

    const [state, _setState] = useState({
        selected: "About you",
        questionnaire_phase: checkIfDefined(props.questionnaire_phase, {}),
        showValidationModal: false
    })

    const [invalidSections, setInvalidSections] = useState([])

    useEffect(() => {
        setState({ ...state, questionnaire_phase: props.questionnaire_phase })
    }, [props.questionnaire_phase])

    let stateRef = useRef(state)

    const setState = (values) => {
        stateRef.current = values;
        _setState(values);
    }

    const setSelectedSection = (title) => {
        props.OnCacheQuestionnaireChanges(state.questionnaire_phase)
        setState({ ...state, selected: title })
    }

    const formatKeys = (key) => {
        let temp = key.replace(/_/g, " ").toLowerCase()
        return temp.charAt(0).toUpperCase() + temp.slice(1);
    }

    const sections = Object.keys(props.questionnaire_phase).map(key => {
        if (key !== undefined && props.questionnaire_phase[key] !== undefined && key !== "general") {
            const invalid = invalidSections.includes(key)
            if (key === "client_details") {
                key = "About you"
            }
            if (key === "sleep_history") {
                key = "Sleep history & symptoms"
            }
            return (
                <SectionTab
                    key={formatKeys(key)}
                    title={formatKeys(key)}
                    isSelected={formatKeys(key) === stateRef.current.selected}
                    setSelectedSection={setSelectedSection}
                    invalid={invalid}
                />
            )
        }
    })

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

    const filterObject = (data) => {
        let result = {}

        for (let key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                result[key] = data[key]
            }
        }
        return result
    }

    const clientDetails = filterObject(checkIfDefined(props.questionnaire_phase.client_details, {}))
    const formikAboutYou = useFormik({
        initialValues: clientDetails,
        validationSchema: Yup.object({
            age: clientDetails.age !== undefined && clientDetails.age !== null ? Yup.number().typeError("Number required") : null,
            height: clientDetails.height !== undefined && clientDetails.height !== null ? Yup.number().typeError("Number required") : null,
            weight: clientDetails.weight !== undefined && clientDetails.weight !== null ? Yup.number().typeError("Number required") : null,
            waist_circumference: clientDetails.waist_circumference !== undefined && clientDetails.waist_circumference !== null ? Yup.number().typeError("Number required") : null,
            neck_circumference: clientDetails.neck_circumference !== undefined && clientDetails.neck_circumference !== null ? Yup.number().typeError("Number required") : null
        })
    });

    const sleepHistory = filterObject(checkIfDefined(props.questionnaire_phase.sleep_history, {}))
    const formikSleepHistory = useFormik({
        initialValues: sleepHistory,
        validationSchema: Yup.object({
            period: sleepHistory.period !== undefined && sleepHistory.period !== null ? Yup.string() : null,
            problem_nights: sleepHistory.problem_nights !== undefined && sleepHistory.problem_nights !== null ? Yup.string() : null,
            sleep_time: sleepHistory.sleep_time !== undefined && sleepHistory.sleep_time !== null ? Yup.string() : null,
            to_sleep_duration: sleepHistory.to_sleep_duration && sleepHistory.to_sleep_duration !== null ? Yup.number().typeError("Number required") : null,
            wakeup_time: sleepHistory.wakeup_time !== undefined && sleepHistory.wakeup_time !== null ? Yup.string() : null,
            sleep_duration: sleepHistory.sleep_duration && sleepHistory.sleep_duration !== null ? Yup.number().typeError("Number required") : null,
            sleep_quality: sleepHistory.sleep_quality && sleepHistory.sleep_quality !== null ? Yup.number().typeError("Number required") : null,
            restorative_rating: sleepHistory.restorative_rating && sleepHistory.to_sleerestorative_rating_duration !== null ? Yup.number().typeError("Number required") : null,
            alertness: sleepHistory.alertness && sleepHistory.alertness !== null ? Yup.number().typeError("Number required") : null
        })
    });

    const epworthScale = checkIfDefined(props.questionnaire_phase.epworth_sleepiness_scale, {})
    const formikEpworthScale = useFormik({
        initialValues: filterObject(epworthScale)
    });

    const fatigueScale = checkIfDefined(props.questionnaire_phase.fatigue_severity_scale, {})
    const formikFatigueScale = useFormik({
        initialValues: filterObject(fatigueScale),
        validationSchema: Yup.object({
            easily_fatigued: fatigueScale.easily_fatigued !== undefined && fatigueScale.easily_fatigued !== null ? Yup.number().typeError("Number required") : null,
            physical_functionality: fatigueScale.physical_functionality !== undefined && fatigueScale.physical_functionality !== null ? Yup.number().typeError("Number required") : null,
            frequent_problems: fatigueScale.frequent_problems !== undefined && fatigueScale.frequent_problems !== null ? Yup.number().typeError("Number required") : null,
            sustained_physical: fatigueScale.sustained_physical !== undefined && fatigueScale.sustained_physical !== null ? Yup.number().typeError("Number required") : null,
            duties_responsibilities: fatigueScale.duties_responsibilities !== undefined && fatigueScale.duties_responsibilities !== null ? Yup.number().typeError("Number required") : null,
            disabling_symptoms: fatigueScale.disabling_symptoms !== undefined && fatigueScale.disabling_symptoms !== null ? Yup.number().typeError("Number required") : null,
            work_family_social: fatigueScale.work_family_social !== undefined && fatigueScale.work_family_social !== null ? Yup.number().typeError("Number required") : null
        })
    });

    const insomniaIndex = checkIfDefined(props.questionnaire_phase.insomnia_severity_index, {})
    const formikInsomniaIndex = useFormik({
        initialValues: filterObject(insomniaIndex),

    });

    const medicalHistory = checkIfDefined(props.questionnaire_phase.medical_history, {})
    const formikMedicalHistory = useFormik({
        initialValues: filterObject(medicalHistory),
    });

    const lifestyleFactors = checkIfDefined(props.questionnaire_phase.lifestyle_factors, {})
    const formikLifestyleFactors = useFormik({
        initialValues: filterObject(lifestyleFactors),
    });

    let form = null

    switch (stateRef.current.selected) {
        case "About you":
            form = <AboutYou
                loading={props.loading}
                formik={formikAboutYou}
            />
            break;
        case "Sleep history & symptoms":
            form = <SleepHistory
                loading={props.loading}
                formik={formikSleepHistory}
            />
            break;
        case "Epworth sleepiness scale":
            form = <EpworthScale
                loading={props.loading}
                formik={formikEpworthScale}
            />
            break;
        case "Fatigue severity scale":
            form = <FatigueScale
                loading={props.loading}
                formik={formikFatigueScale}
            />
            break;
        case "Insomnia severity index":
            form = <InsomniaIndex
                loading={props.loading}
                formik={formikInsomniaIndex}
            />
            break;
        case "Medical history":
            form = <MedicalHistory
                loading={props.loading}
                formik={formikMedicalHistory}
            />
            break;
        case "Lifestyle factors":
            form = <LifestyleFactors
                loading={props.loading}
                formik={formikLifestyleFactors}
            />
            break;
        default:
            break;
    }

    const onSave = () => {
        props.OnUpdateAssessment(props.token, props.assessment_id, props.phase_number, {
            questionnaire_phase: {
                general: stateRef.current.general,
                client_details: formikAboutYou.values,
                sleep_history: formikSleepHistory.values,
                epworth_sleepiness_scale: formikEpworthScale.values,
                fatigue_severity_scale: formikFatigueScale.values,
                insomnia_severity_index: formikInsomniaIndex.values,
                medical_history: formikMedicalHistory.values,
                lifestyle_factors: formikLifestyleFactors.values
            }
        })
        setInvalidSections([])
    }

    if (!props.loading && props.phaseComplete) {
        setTimeout(() => {
            props.OnSetCurrentTab(props.phase_number + 1) //if not uploading/removing summary report or actigram
            props.OnSetConfirmModal(false)
            props.OnSetPhaseComplete(false)
        }, 2000)
    }

    const cancelError = () => {
        props.OnSetConfirmModal(false)
    }

    const checkForm = (formItem) => {
        return new Promise((resolve, reject) => {

            //set all inputs to touched
            const touched = Object.keys(formItem.formik.initialValues).reduce((result, item) => {
                result[item] = true;
                return result;
            }, {});

            // Touch all fields without running validations
            formItem.formik.setTouched(touched, false);
            formItem.formik.setSubmitting(true);

            formItem.formik
                .validateForm()
                .then((formErrors) => {
                    formItem.formik.setSubmitting(false);
                    if (Object.keys(formErrors).length > 0) {
                        resolve(formItem.name)                      
                    } else {
                        resolve()
                    }
                })
                .catch((err) => {
                    formItem.formik.setSubmitting(false);
                    reject()
                });
        })
    }

    const checkValidity = async () => {
        let formikArray = [{ formik: formikAboutYou, name: "client_details" }, { formik: formikSleepHistory, name: "sleep_history" }, { formik: formikEpworthScale, name: "epworth_sleepiness_scale" },
        { formik: formikFatigueScale, name: "fatigue_severity_scale" }, { formik: formikInsomniaIndex, name: "insomnia_severity_index" }, { formik: formikMedicalHistory, name: "medical_history" },
        { formik: formikLifestyleFactors, name: "lifestyle_factors" }]
        let invalidSections = []
        const promises = formikArray.map(async form => {
            await checkForm(form).then(result => result !== undefined && invalidSections.push(result))
        })

        Promise.all(promises).then(results => {
            setInvalidSections(invalidSections)
            if (invalidSections.length === 0) props.OnSetConfirmModal(true)
            else {
                setState({ ...state, showValidationModal: true })
            }
        })
    }

    return (
        <>
            <ConfirmModal
                show={props.showConfirmModal}
                close={() => props.OnSetConfirmModal(false)}
                removeHeading={props.phaseComplete}
            >{!props.loading
                ? !props.phaseComplete
                    ? !props.error
                        ? <><p>By clicking confirm you are agreeing to <strong>save your changes</strong>, complete the <strong>Questionnaire phase</strong> and continue to the <strong>Consult phase.</strong></p>
                            <div className={classes.ButtonGroup}>
                                <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                <Button buttonType={"primary"} clicked={onSave}>Confirm</Button>
                            </div> </>
                        : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                    : <Feedback type="Success" />
                : <Spinner calledLocation="Questionnaire" loadingMessage="Saving changes..." />}
            </ConfirmModal>

            <ValidationErrorModal
                show={state.showValidationModal}
                close={() => setState({ ...state, showValidationModal: false })}
            >
            </ValidationErrorModal>

            <div className={classes.Container}>
                <div className={classes.LeftContainer}>
                    <div className={classes.Header}>
                        <h5>Section type</h5>
                        <li className={classes.LineRule}></li>
                    </div>
                    <ul className={classes.SectionsContainer}>
                        {sections}
                    </ul>
                </div>
                <div className={classes.RightContainer}>
                    <div className={classes.Header}>
                        <h5>Responses</h5>
                        <li className={classes.LineRule}></li>
                        <PreviousSaveButtons
                            OnSave={checkValidity}
                            phase={"questionnaire"}
                        />
                    </div>
                    <div className={classes.FormContainer}>
                        {form}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Questionnaire