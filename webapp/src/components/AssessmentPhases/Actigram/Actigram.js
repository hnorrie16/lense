import React, { useState, useRef, useEffect } from 'react';
import classes from './Actigram.module.css'
import upload from '../../../Assets/Icons/upload.svg'
import DayRow from './DayRow/DayRow'
import * as XLSX from 'xlsx';
import { checkIfDefined, timeFormatter } from '../../../shared/Utility'
import ViewSummaryReportModal from '../../UI/Modals/ViewSummaryReportModal/ViewSummaryReportModal'
import ViewActigramModal from '../../UI/Modals/ViewActigramModal/ViewActigramModal'
// import FileIcon from '../../../Assets/Icons/file.svg'
import PreviousSaveButtons from '../../UI/PreviousSaveButtons/PreviousSaveButtons'
import ConfirmModal from '../../UI/Modals/ConfirmModal/ConfirmModal'
import GeneralModal from '../../UI/Modals/GeneralModal/GeneralModal'
import Spinner from '../../UI/Spinner/Spinner'
import Feedback from '../../UI/Feedback/Feedback'
import Button from '../../UI/Button/Button'
import ValidationErrorModal from '../../UI/Modals/ValidationErrorModal/ValidationErrorModal'
import FeedbackGlobal from '../../UI/FeedbackGlobal/FeedbackGlobal'

const Actigram = (props) => {

    const firstWeek = {
        "1": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "2": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "3": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "4": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "5": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "6": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        },
        "7": {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        }
    }
    const [state, _setState] = useState({
        confirmModalType: "",
        showModal: {
            summaryReport: false,
            actigram: false,
            validation: false,
            errorModal: false
        },
        lastKey: Object.keys(checkIfDefined(checkIfDefined(props.actigraphy_phase, {}).sleep_diary, firstWeek)).length,
        days: checkIfDefined(checkIfDefined(props.actigraphy_phase, {}).sleep_diary, firstWeek)
    })

    const [valid, setValid] = useState({
        actigram: true,
        summaryReport: true
    })

    let stateRef = useRef(state)

    const setState = (info) => {
        stateRef.current = info;
        _setState(info);
    }

    const setShowModal = (updated) => {
        setState({ ...state, showModal: updated })
    }

    const setDays = (updatedDays, updatedLastKey) => {
        setState({ ...state, days: updatedDays, lastKey: updatedLastKey })
    }

    const daysRows = Array.from(Array(Object.keys(stateRef.current.days).length), (x, index) => index + 1).map(day => (
        <DayRow
            data={stateRef.current.days[day + ""]}
            key={day}
            day={day + ""}
            setDays={setDays}
            index={day}
            days={stateRef.current.days}
            lastKey={stateRef.current.lastKey}
        />
    ))

    const addWeek = () => {
        setDays({
            ...stateRef.current.days,
            [stateRef.current.lastKey + 1]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },

            [stateRef.current.lastKey + 2]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },

            [stateRef.current.lastKey + 3]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },

            [stateRef.current.lastKey + 4]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },

            [stateRef.current.lastKey + 5]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },

            [stateRef.current.lastKey + 6]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            },
            [stateRef.current.lastKey + 7]: {
                sleep_medication: 0,
                sleep_satisfaction: 0,
                sleep_restoration: 0
            }
        }, stateRef.current.lastKey + 7)
    }

    const addDay = () => {
        let daysCopy = Object.assign({}, stateRef.current.days)
        daysCopy[(stateRef.current.lastKey + 1) + ""] = {
            sleep_medication: 0,
            sleep_satisfaction: 0,
            sleep_restoration: 0
        }
        setDays(daysCopy, stateRef.current.lastKey + 1)
    }

    const removeWeek = () => {
        let daysCopy = Object.assign({}, stateRef.current.days)
        const removeWeekLastKey = stateRef.current.lastKey - 7
        console.log(stateRef.current.lastKey)
        for (let key in stateRef.current.days) {
            if (+key > removeWeekLastKey) delete daysCopy[key]
        }
        setDays(daysCopy, removeWeekLastKey)
    }
    const removeDay = () => {
        let daysCopy = Object.assign({}, stateRef.current.days)
        delete daysCopy[stateRef.current.lastKey + ""]

        setDays(daysCopy, stateRef.current.lastKey - 1)
    }

    // const [summaryColumns, setSummaryColumns] = useState([]);
    // const [summaryData, setSummaryData] = useState([]);
    // const [dailyColumns, setDailyColumns] = useState([]);
    // const [dailyData, setDailyData] = useState([]);

    // Converts time string to decimal number
    const timeStringToFloat = (time) => {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }

    const convertData = (rawData, objectName) => {
        let name = ""
        let rowObject = {}
        for (var item of rawData) {
            if (item["SUMMARY"]) {
                name = item["SUMMARY"].toLowerCase()
                const arousalIndex = ((item["No of arousals"] / timeStringToFloat(item["Total sleep time (h:min:s)"])).toFixed(2))
                const dataItem = {
                    "bedtime": item["Bedtime"],
                    "wakeup_time": item["Wake-up time"],
                    "time_in_bed": item["Time-in-bed (h:min:s)"],
                    "sleep_time": item["Total sleep time (h:min:s)"],
                    "onset_latency": item["Onset latency (min)"],
                    "sleep_efficiency": item["Sleep efficiency (%)"],
                    "waso": item["WASO (min)"],
                    "no_arousals": item["No of arousals"],
                    "arousal_index": arousalIndex
                }
                rowObject[name] = dataItem
            }
            else {
                return "Invalid File"
            }

        }
        return { [objectName]: rowObject }
    }

    // process CSV data
    const processData = (dataString, fileName) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const summaryList = [];
        const dailyList = []

        for (let i = 1; i < 4; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                let sleepTime = 0
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        if (d.includes(":")) obj[headers[j]] = timeFormatter(d);
                        else obj[headers[j]] = d;
                    }
                    if (headers[j] === "Total sleep time (h:min:s)") sleepTime = d
                    if (headers[j] === "No of arousals") {
                        const arousalIndex = (d / timeStringToFloat(sleepTime)).toFixed(2)
                        obj["Arousal index"] = arousalIndex
                    }
                }
                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    summaryList.push(obj);
                }
            }
        }
        // prepare columns list from headers
        const summaryColumns = headers.map(c => ({
            name: c,
            selector: c,
        }));
        summaryColumns.push({ name: "Arousal index", selector: "Arousal index" })

        for (let i = 6; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                let sleepTime = 0
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        if (d.includes(":")) obj[headers[j]] = timeFormatter(d);
                        else obj[headers[j]] = d;
                    }
                    if (headers[j] === "Total sleep time (h:min:s)") sleepTime = d
                    if (headers[j] === "No of arousals") {
                        const arousalIndex = +(d / timeStringToFloat(sleepTime)).toFixed(2)
                        obj["Arousal index"] = arousalIndex
                    }
                }
                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    dailyList.push(obj);
                }
            }
        }
        // prepare columns list from headers
        const dailyColumns = headers.map(c => ({
            name: c === "SUMMARY" ? "DAILY" : c,
            selector: c,
        }));

        dailyColumns.push({ name: "Arousal index", selector: "Arousal index" })
        // setSummaryData(summaryList);
        // setSummaryColumns(summaryColumns);
        // setDailyData(dailyList);
        // setDailyColumns(dailyColumns);

        const summaryConverted = convertData(summaryList, "summary")
        if (summaryConverted !== "Invalid File") {
            const dailyConverted = convertData(dailyList, "daily")
            const finalObject = { file_name: fileName, ...summaryConverted, ...dailyConverted, "summary_raw": { "columns": summaryColumns, "data": summaryList }, "daily_raw": { "columns": dailyColumns, "data": dailyList } }
            props.OnUploadSummaryReport(props.token, props.assessment_id, finalObject, props.status)
        }
        else {
            props.OnSetUploadingSummaryReport(false)
            setShowModal({ ...stateRef.current.showModal, errorModal: true })
        }

    }

    // handle file upload for summary report
    const handleReportFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        props.OnSetUploadingSummaryReport(true)
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result; //bstr.length is the size of the file

            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data, file.name);
            setValid({ ...valid, summaryReport: true })

        };
        //validation for file 
        reader.readAsBinaryString(file);
    }

    // handle file upload for actigram
    const handleActigramFileUpload = e => {
        let file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        props.OnSetUploadingActigram()
        props.OnUploadFile(props.token, props.assessment_id, formData, 'actigram', file.name)
        setValid({ ...valid, actigram: true })
    }


    const checkValidity = () => {
        setValid({ ...valid, actigram: checkIfDefined(props.actigram_image, false) ? true : false, summaryReport: props.isSummaryReport })
        if (props.actigram_image && props.isSummaryReport && stateRef.current.lastKey !== 0) {
            actionClickHandler("savecontinue")
        }
        else {
            setShowModal({ ...stateRef.current.showModal, validation: true })
        }
    }
    const actionClickHandler = (confirmModalType) => {
        setState({ ...state, confirmModalType: confirmModalType })
        props.OnSetConfirmModal(true)
    }

    const onConfirmHandler = () => {
        if (stateRef.current.confirmModalType === "savecontinue") props.OnUpdateAssessment(props.token, props.assessment_id, props.phase_number, { actigraphy_phase: { report: props.actigraphy_phase.report, sleep_diary: stateRef.current.days } })
        else if (stateRef.current.confirmModalType === "actigram") {
            //remove actigram
            props.OnRemoveFile(props.token, props.assessment_id, "actigram", props.actigram_image.key)
        }
        else if (stateRef.current.confirmModalType === "summary") {
            //remove summary report
            props.OnRemoveSummaryReport(props.token, props.assessment_id, {}, props.status)
        }
    }

    if ((!props.loading && props.phaseComplete) || (!props.removingFile && props.removingFileComplete) || (!props.removingSummaryReport && props.removingFileComplete)) {
        setTimeout(() => {
            if (!props.removingFileComplete && props.phaseComplete) props.OnSetCurrentTab(props.phase_number + 1) //if not uploading/removing summary report or actigram
            props.OnSetConfirmModal(false)
            props.OnSetPhaseComplete(false)
            props.OnSetRemovingFileComplete(false)
            stateRef.current.confirmModalType === "actigram" && setValid({ ...valid, actigram: false })
            stateRef.current.confirmModalType === "summary" && setValid({ ...valid, summaryReport: false })
        }, 2000)
    }

    const cancelError = () => {
        props.OnSetConfirmModal(false)
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
            <GeneralModal
                show={stateRef.current.showModal.errorModal}
                close={() => setShowModal({ ...stateRef.current.showModal, errorModal: false })}
                removeHeading={stateRef.current.showModal.errorModal}
            >
                <FeedbackGlobal type="Fail" error={"Invalid file. Please reformat the file contents or upload the correct file."} errorLocation={"register"} OnSetAssessmentError={() => setShowModal({ ...stateRef.current.showModal, errorModal: false })} />

            </GeneralModal>

            <ConfirmModal
                show={props.showConfirmModal}
                close={() => props.OnSetConfirmModal(false)}
                removeHeading={props.removingFileComplete || props.phaseComplete}
            >
                {stateRef.current.confirmModalType === "savecontinue" ?
                    !props.loading
                        ? !props.phaseComplete
                            ? !props.error
                                ? <> <p>By clicking confirm you are agreeing to <strong>save your changes</strong>, complete the <strong>Actogram phase</strong> and continue to the <strong>Data Analysis phase.</strong></p>
                                    <div className={classes.ButtonGroup}>
                                        <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                        <Button buttonType={"primary"} clicked={onConfirmHandler}>Confirm</Button>
                                    </div> </>
                                : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                            : <Feedback type="Success" />
                        : <Spinner calledLocation="Consult" loadingMessage="Saving changes..." />

                    : stateRef.current.confirmModalType === "actigram" ?
                        !props.removingFile //loading for removing actigram
                            ? !props.removingFileComplete
                                ? !props.error
                                    ? <><p>By clicking confirm you are agreeing to <strong>remove</strong> the uploaded actogram file.</p>
                                        <div className={classes.ButtonGroup}>
                                            <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                            <Button buttonType={"primary"} clicked={onConfirmHandler}>Confirm</Button>
                                        </div> </>
                                    : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                                : <Feedback type="Success" successMessage="Successfuly deleted!" />
                            : <Spinner calledLocation="Consult" loadingMessage="Saving changes..." />

                        : stateRef.current.confirmModalType === "summary" ? //removing summary report
                            !props.removingSummaryReport
                                ? !props.removingFileComplete
                                    ? !props.error
                                        ? <> <p>By clicking confirm you are agreeing to <strong>remove</strong> the uploaded summary report file.</p>
                                            <div className={classes.ButtonGroup}>
                                                <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                                                <Button buttonType={"primary"} clicked={onConfirmHandler}>Confirm</Button>
                                            </div> </>
                                        : <Feedback type="Fail" OnSetAssessmentError={props.OnSetAssessmentError} cancelError={cancelError} />
                                    : <Feedback type="Success" successMessage="Successfuly deleted!" />
                                : <Spinner calledLocation="Consult" loadingMessage="Saving changes..." />
                            : null
                }
            </ConfirmModal>

            <ViewSummaryReportModal show={stateRef.current.showModal.summaryReport} close={() => setShowModal({ ...stateRef.current.showModal, summaryReport: false })} report={checkIfDefined(checkIfDefined(props.actigraphy_phase, {}).report, {})} />
            <ViewActigramModal show={stateRef.current.showModal.actigram} close={() => setShowModal({ ...stateRef.current.showModal, actigram: false })} image={checkIfDefined(checkIfDefined(props.actigram_image, {}).file, "")} />
            <ValidationErrorModal show={stateRef.current.showModal.validation} close={() => setShowModal({ ...stateRef.current.showModal, validation: false })} />

            <div className={classes.Container}>
                <div className={classes.TopContainer}>
                    <div className={classes.Sub}>
                        <div className={classes.Header}>
                            <h5>Actogram</h5>
                            <li className={classes.LineRule}></li>
                        </div>
                        <div className={classes.UploadContainer}>
                            <div className={valid.actigram ? classes.DashedBoarder : [classes.DashedBoarder, classes.InvalidDashedBoarder].join(' ')}>
                                <div className={classes.Inner}>
                                    {!props.actigram_image
                                        ? <img src={upload} alt="upload icon" />
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#A1A5B1" className="bi bi-file-image" viewBox="0 0 16 16">
                                            <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
                                        </svg>}
                                    {!props.uploadingFile && (props.actigram_image === undefined || Object.keys(props.actigram_image).length === 0)
                                        ? <div>
                                            <h3>Upload actogram here</h3>
                                            {/* <button>Browse Files</button> */}
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-image" viewBox="0 0 16 16">
                                                    <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
                                                </svg>
                                                <input
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg"
                                                    onChange={handleActigramFileUpload}
                                                /> Choose file
                                        </label>
                                            <span>Supports: png, jpg, jpeg</span>

                                        </div>
                                        : props.uploadingFile
                                            ? <div>
                                                <h3>Uploading...</h3>
                                                {/* <i className="fa fa-circle-o-notch fa-spin"></i> */}
                                            </div>
                                            : props.actigram_image !== undefined
                                                ? <div>
                                                    <h3>Actogram uploaded</h3>
                                                    <div className={classes.FileUploaded}>
                                                        <span>{checkIfDefined(props.actigram_image, {}).file_name}</span>
                                                    </div>
                                                    <button onClick={() => setShowModal({ ...stateRef.current.showModal, actigram: true })}>View</button>
                                                    <button onClick={() => actionClickHandler("actigram")}>Delete</button>
                                                </div>
                                                : <div>
                                                    <h3>Upload actogram here</h3>

                                                    <label>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-image" viewBox="0 0 16 16">
                                                            <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
                                                        </svg>
                                                        <input
                                                            type="file"
                                                            accept=".png,.jpg,.jpeg"
                                                            onChange={handleActigramFileUpload}
                                                        />Choose file
                                                </label>
                                                    <span>Supports: png, jpg, jpeg</span>
                                                </div>
                                    }
                                    {/* <div>
                                    <h3>Drag &#38; drop the file here</h3>
                                    <input
                                        type="file"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleActigramFileUpload}
                                    />
                                </div> */}
                                </div>
                                {!valid.actigram &&
                                    <div className={classes.ValidationError}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(197, 0, 0)" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg> <span>Actogram required</span>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className={classes.Sub}>
                        <div className={classes.Header}>
                            <h5>Summary report</h5>
                            <li className={classes.LineRule}></li>
                            <PreviousSaveButtons
                                OnPrevious={() => props.OnSetCurrentTab(2)}
                                OnSave={() => checkValidity()}
                            />
                        </div>
                        <div className={valid.summaryReport ? classes.UploadContainer : [classes.UploadContainer, classes.InvalidUploadContainer].join(' ')}>
                            <div className={valid.summaryReport ? classes.DashedBoarder : [classes.DashedBoarder, classes.InvalidDashedBoarder].join(' ')}>
                                <div className={classes.Inner_summary}>
                                    {!props.isSummaryReport
                                        ? <img src={upload} alt="upload icon" />
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#A1A5B1" className="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z" />
                                        </svg>}
                                    {!props.uploadingSummaryReport && !props.isSummaryReport
                                        ? <div>
                                            <h3>Upload summary report here</h3>

                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
                                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z" />
                                                </svg>
                                                <input
                                                    type="file"
                                                    accept=".csv,.xlsx,.xls"
                                                    onChange={handleReportFileUpload}
                                                />Choose file
                                        </label>
                                            <span>Supports: csv, xlsx, xls</span>
                                        </div>
                                        : props.uploadingSummaryReport
                                            ? <div>
                                                <h3>Uploading...</h3>
                                            </div>
                                            : props.isSummaryReport
                                                ? <div>
                                                    <h3>Summary report uploaded</h3>
                                                    <div className={classes.FileUploaded}>
                                                        <span>{checkIfDefined(checkIfDefined(props.actigraphy_phase, {}).report, {}).file_name}</span>
                                                    </div>
                                                    <button onClick={() => setShowModal({ ...stateRef.current.showModal, summaryReport: true })}>View</button>
                                                    <button onClick={() => actionClickHandler("summary")}>Delete</button>
                                                </div>
                                                : <div>
                                                    <h3>Upload summary report here</h3>
                                                    {/* <button>Browse Files</button> */}
                                                    <label>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
                                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z" />
                                                        </svg>
                                                        <input
                                                            type="file"
                                                            accept=".csv,.xlsx,.xls"
                                                            onChange={handleReportFileUpload}
                                                        />Choose file
                                                </label>
                                                    <span>Supports: csv, xlsx, xls</span>
                                                </div>
                                    }
                                </div>
                                {!valid.summaryReport && <div className={classes.ValidationError}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(197, 0, 0)" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                    </svg> <span>Summary report required</span>
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={classes.Header}>
                    <h5>Sleep diary</h5>
                    <li className={classes.LineRule}></li>
                    <button onClick={addWeek} className={classes.AddWeek}>+ Add week</button>
                    <button onClick={Object.keys(stateRef.current.days).length > 6 ? removeWeek : null} className={Object.keys(stateRef.current.days).length > 6 ? classes.RemoveWeek : classes.RemoveWeek_disabled}>- Remove week</button>
                    <button className={classes.AddDay} onClick={addDay}>+ Add Day</button>
                    <button className={Object.keys(stateRef.current.days).length >= 1 ? classes.RemoveDay : classes.RemoveDay_disabled} onClick={Object.keys(stateRef.current.days).length >= 1 ? removeDay : null}>- Remove Day</button>
                </div>
                <div className={classes.SleepDiaryContainer}>
                    {Object.keys(stateRef.current.days).length !== 0 ? <table>
                        <thead>
                            <tr className={classes.TableHeadingRow}>
                                <th>Day</th>
                                <th>Sleep Medication Use</th>
                                <th>Sleep Satisfaction</th>
                                <th>Restoration</th>
                            </tr>
                        </thead>
                        <tbody className={classes.Days}>
                            {daysRows}
                        </tbody>
                    </table> : <h3 className={classes.SleepDiaryRequired}>Sleep diary is required<br />Please add a day or week</h3>}
                </div>
            </div>
        </>
    )
}

export default Actigram