import React, { useEffect, useRef, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './Consult.module.css'
import PreviousSaveButtons from '../../UI/PreviousSaveButtons/PreviousSaveButtons'
import ConfirmModal from '../../UI/Modals/ConfirmModal/ConfirmModal'
import Spinner from '../../UI/Spinner/Spinner'
import Feedback from '../../UI/Feedback/Feedback'
import Button from '../../UI/Button/Button'
import { checkIfDefined } from '../../../shared/Utility'

const Consult = (props) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const [state, _setState] = useState({
        view: true,
        confirmModalType: ""
    })

    let stateRef = useRef(state)
    const setState = (val) => {
        stateRef.current = val;
        _setState(val)
    }

    useEffect(() => {
        if (Object.keys(props.consult_phase).length !== 0) {
            const contentState = convertFromRaw({ ...props.consult_phase.notes, entityMap: {} })
            const editorState = EditorState.createWithContent(contentState)
            setEditorState(editorState)
        }
    }, [props.consult_phase])

    const onSave = async () => {//how you get the text from the editor
        const updated_object = { consult_phase: { notes: convertToRaw(editorState.getCurrentContent()) } }
        props.OnUpdateAssessment(props.token, props.assessment_id, props.phase_number, updated_object)
    }

    const handleFileUpload = e => {
        let file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        props.OnSetUploadingConsultNotes()
        props.OnUploadFile(props.token, props.assessment_id, formData, 'consult_phase', file.name)
    }

    const cancelError = () => {
        props.OnSetConfirmModal(false)
    }

    let content = null
    if (stateRef.current.view) {
        content = (
            <div className={classes.RichEditorContainer}>
                <Editor
                    wrapperClassName={classes.WrapperEditor}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    editorClassName={classes.EditorClass}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'emoji', 'history']
                    }}
                />
                <div className={classes.InfoBlock}>
                    <span>Full name: {props.client_details.fullname}</span>
                    <span>Gender: {props.client_details.gender}</span>
                    <span>Age: {props.client_details.age}</span>
                    <span>Height: {props.client_details.height}</span>
                    <span>Weight: {props.client_details.weight}</span>
                    <span>Waist Circumference: {props.client_details.waist_circumference}</span>
                    <span>Neck Circumference: {props.client_details.neck_circumference}</span>
                    <span>BMI: {props.bmi}</span>
                </div>
            </div>
        )
    } else {
        content = (
            <>
                {/* {props.consult_file !== undefined && <iframe src={props.consult_file.file} ></iframe>} */}
                <div className={classes.UploadContainer}>
                    <div className={classes.DashedBoarder}>
                        <div className={classes.Inner}>
                            {!props.uploadingFile && !props.uploadingConsultNotes && props.consult_file === undefined
                                ? <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#A1A5B1" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                        <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                    </svg>
                                    <div>
                                        <h3>Upload consult notes here</h3>
                                        <label className={classes.UploadButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-font" viewBox="0 0 16 16">
                                                <path d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z" />
                                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                            </svg>
                                            <input type="file" onChange={handleFileUpload} accept=".doc, .docx, .pdf" />
                                        Choose file
                                </label>
                                        <span>Supports: doc, docx, pdf</span>
                                    </div>

                                </>
                                : props.uploadingFile && <i className="fa fa-circle-o-notch fa-spin"></i>
                                    ?
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#A1A5B1" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                            <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                        </svg>
                                        <div>
                                            <h3>Uploading...</h3>
                                        </div>
                                    </>
                                    : props.consult_file !== undefined
                                        ? <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#A1A5B1" className="bi bi-file-earmark-font" viewBox="0 0 16 16">
                                                <path d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z" />
                                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                            </svg>
                                            <div className={classes.UploadedConsult}>
                                                <h3>Consult notes uploaded</h3>

                                                <div className={classes.FileUploaded}>
                                                    <span>{checkIfDefined(props.consult_file, {}).file_name}</span>
                                                </div>
                                                <a href={props.consult_file.file} target="_blank" rel="noreferrer">Download</a>
                                                <button onClick={() => actionClickHandler("notes")}>Delete</button>
                                            </div>
                                        </>
                                        : <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="rgb(73, 77, 83)" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                                <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                            <label className={classes.UploadButton}>
                                                <input type="file" onChange={handleFileUpload} />
                                    Upload file
                                </label>
                                        </>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
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

    const actionClickHandler = (confirmModalType) => {
        setState({ ...state, confirmModalType: confirmModalType })
        props.OnSetConfirmModal(true)
    }

    const onConfirmHandler = () => {
        if (stateRef.current.confirmModalType === "savecontinue") props.OnUpdateAssessment(props.token, props.assessment_id, props.phase_number, { actigraphy_phase: { report: props.actigraphy_phase.report, sleep_diary: stateRef.current.days } })
        else if (stateRef.current.confirmModalType === "notes") {
            //remove actigram
            props.OnRemoveFile(props.token, props.assessment_id, "consult_phase", props.consult_file.key)
        }
    }

    if ((!props.loading && props.phaseComplete) || (!props.removingFile && props.removingFileComplete) || (!props.removingSummaryReport && props.removingFileComplete)) {
        setTimeout(() => {
            if (!props.removingFileComplete && props.phaseComplete) props.OnSetCurrentTab(props.phase_number + 1) //if not uploading/removing summary report or actigram
            props.OnSetConfirmModal(false)
            props.OnSetPhaseComplete(false)
            props.OnSetRemovingFileComplete(false)
        }, 2000)
    }

    const onSaveClick = () => {
        actionClickHandler("savecontinue")
        props.OnSetConfirmModal(true)
    }

    const tabChangeHandler = (type) => {
        props.OnCacheConsultNotes(convertToRaw(editorState.getCurrentContent()))
        setState({ ...state, view: type })
    }
    return (
        <>
            <ConfirmModal
                show={props.showConfirmModal}
                close={() => props.OnSetConfirmModal(false)}
                removeHeading={props.phaseComplete || props.removingFileComplete}
            >{stateRef.current.confirmModalType === "savecontinue"
                ? !props.loading
                    ? !props.phaseComplete
                        ? !props.error
                            ? <> <p>By clicking confirm you are agreeing to <strong>save your changes</strong>, complete the <strong>Consult phase</strong> and continue to the <strong>Actogram phase.</strong></p>
                                <div className={classes.ButtonGroup}>
                                    <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                    <Button buttonType={"primary"} clicked={onSave}>Confirm</Button>
                                </div> </>
                            : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                        : <Feedback type="Success" />
                    : <Spinner calledLocation="Consult" loadingMessage="Saving changes..." />

                : stateRef.current.confirmModalType === "notes" ?
                    !props.removingFile //loading for removing actigram
                        ? !props.removingFileComplete
                            ? !props.error
                                ? <><p>By clicking confirm you are agreeing to <strong>remove</strong> the uploaded consult notes file.</p>
                                    <div className={classes.ButtonGroup}>
                                        <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                        <Button buttonType={"primary"} clicked={onConfirmHandler}>Confirm</Button>
                                    </div> </>
                                : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                            : <Feedback type="Success" successMessage="Successfully deleted!" />
                        : <Spinner calledLocation="Consult" loadingMessage="Saving changes..." />
                    : null
                }
            </ConfirmModal>

            <div className={classes.Container}>
                <div className={classes.Header}>
                    <h5>Consultation notes</h5>

                    <li className={classes.LineRule}></li>
                    <PreviousSaveButtons
                        OnPrevious={() => props.OnSetCurrentTab(1)}
                        OnSave={onSaveClick}
                    />
                </div>
                <div className={classes.FlexContainer}>
                    <div className={classes.ButtonToggleGroup}>
                        <button className={stateRef.current.view ? classes.WrittenNotes_active : classes.WrittenNotes} onClick={() => tabChangeHandler(true)}>Write</button>
                        <button className={!stateRef.current.view ? classes.UploadNotes_active : classes.UploadNotes} onClick={() => tabChangeHandler(false)}>Upload</button>
                    </div>
                </div>
                {content}
            </div>
        </>
    )
}

export default Consult