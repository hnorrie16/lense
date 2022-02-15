import React, { useState } from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './StartAssessmentModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import upload from '../../../../Assets/Icons/upload.svg'
import Button from '../../Button/Button'
import * as XLSX from 'xlsx';
import Spinner from '../../Spinner/Spinner'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import StartAssessmentFeedback from '../../StartAssessmentFeedback/StartAssessmentFeedback'
import { checkIfDefined } from '../../../../shared/Utility'
import { object } from 'yup/lib/locale';

const StartAssessmentModal = props => {

    // const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        // const dataStringLines = dataString.split(/\r\n|\n/);
        const dataStringLines = CSVToArray(dataString, ",");
        // const headers = dataStringLines[0][0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const headers = dataStringLines[0]

        let list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            // const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            const row = dataStringLines[i]

            if (headers && row.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }

            }
        }

        // prepare columns list from headers
        // const columns = headers.map(c => ({
        //     name: c,
        //     selector: c,
        // }));
        list = list.filter(item => checkIfDefined(item["Timestamp"], false)) //remove all assessments where the timestamp of the client is undefined or null
        setData(list);
        // setColumns(columns);
        props.OnSetProcessingXLSXCSV(false, undefined, true)
    }

    function CSVToArray(CSV_string, delimiter) {
        delimiter = (delimiter || ","); // user-supplied delimeter or default comma

        var pattern = new RegExp( // regular expression to parse the CSV values.
            ( // Delimiters:
                "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + delimiter + "\\r\\n]*))"
            ), "gi"
        );

        var rows = [[]];  // array to hold our data. First row is column headers.
        // array to hold our individual pattern matching groups:
        var matches = false; // false if we don't find any matches
        // Loop until we no longer find a regular expression match
        while (matches = pattern.exec(CSV_string)) {
            var matched_delimiter = matches[1]; // Get the matched delimiter
            // Check if the delimiter has a length (and is not the start of string)
            // and if it matches field delimiter. If not, it is a row delimiter.
            if (matched_delimiter.length && matched_delimiter !== delimiter) {
                // Since this is a new row of data, add an empty row to the array.
                rows.push([]);
            }
            var matched_value;
            // Once we have eliminated the delimiter, check to see
            // what kind of value was captured (quoted or unquoted):
            if (matches[2]) { // found quoted value. unescape any double quotes.
                matched_value = matches[2].replace(
                    new RegExp("\"\"", "g"), "\""
                );
            } else { // found a non-quoted value
                matched_value = matches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            rows[rows.length - 1].push(matched_value);
        }
        return rows; // Return the parsed data Array
    }

    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        props.OnSetProcessingXLSXCSV(true, file.name, false)
        reader.onload = (evt) => {
            // Parse data
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            // Get first worksheet 
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            // Convert array of arrays
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    const handleClose = () => {
        props.OnSetStartAssessmentConfirmModal(false)
        props.OnSetStartAssessmentComplete(false)
        props.close()
    }

    let content = null

    if (!props.loading_processing && !props.fileProcessingComplete && !props.loading_start_assessment) {
        content = <>
            <p>Please upload a csv file containing the questionnaire for one or more clients. If a client has not be registered they will be automatically registered once you have uploaded the csv file.</p>
            <div className={classes.UploadContainer}>
                <div className={classes.Inner}>
                    <img src={upload} alt="upload icon" />
                    <div>
                        <h3>Upload file here</h3>

                        <label className={classes.UploadButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                            </svg>
                            <input
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileUpload}
                            />
                                        Choose file
                                </label>
                        <span>Supports: doc, docx, pdf</span>
                    </div>
                </div>
            </div>
            <div className={classes.ButtonGroup}>
                <Button buttonType={"secondary"} clicked={handleClose}>Close</Button>
            </div>
        </>
    } else if (props.loading_processing && !props.fileProcessingComplete && !props.loading_start_assessment) {
        content = <>
            <p>Please upload a csv file containing the questionnaire for one or more clients. If a client has not be registered they will be automatically registered once you have uploaded the csv file.</p>
            <div className={classes.UploadContainer}>
                {/* <img src={upload} alt="upload icon" /> */}
                <Spinner calledLocation={"StartAssessment"} loadingMessage={"Processing"} />
                {/* <div>
                    <h3>Processing...</h3>
                </div> */}
            </div>
        </>
    }

    let table = null
    if (props.fileProcessingComplete && !props.loading_processing) {
        table = <table className={classes.Table}>
            <thead>
                <tr>
                    <th>Full name</th>
                    <th>ID number</th>
                    <th>Primary complaint</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(client =>
                        <tr key={client["ID number"]} className={classes.Row}>
                            <td className={classes.Data}>{client["Full name"]}</td>
                            <td className={classes.Data}>{client["ID number"]}</td>
                            <td className={classes.Data}>{checkIfDefined(client["Primary complaint"], "---")}</td>
                            <td className={classes.Data}>{client["Timestamp"]}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    }

    return (
        <>
            <ConfirmModal
                show={props.startAssessmentConfirmModal}
                close={() => props.OnSetStartAssessmentConfirmModal(false)}
                classCustom={classes.ConfirmModalCustom}
                removeHeading={props.startAssessmentComplete || props.error}
            >{props.fileProcessingComplete && !props.loading_start_assessment
                ? !props.startAssessmentComplete
                    ? !props.error
                        ? <> <p>By clicking confirm you are agreeing to <strong>upload</strong> the listed clients.</p>
                            <div className={classes.ButtonGroup}>
                                <Button buttonType={"secondary"} clicked={handleClose}>Cancel</Button>
                                <Button buttonType={"primary"} clicked={() => props.OnStartAssessment(data, props.token, props.userId)}>Confirm</Button>
                            </div> </>
                        : <StartAssessmentFeedback handleClose={handleClose} type="Fail" failedAt={props.failedAt} totalClients={props.totalClients} totalAssessments={props.totalAssessments} error={props.error} errorLocation={"start_assessment"} />
                    : <StartAssessmentFeedback handleClose={handleClose} type="Success" failedAt={props.failedAt} totalClients={props.totalClients} totalAssessments={props.totalAssessments} error={props.error} />
                : <Spinner />}
            </ConfirmModal>

            <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
                <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : [classes.ModalVisible,classes.HideModal].join(' ')}>
                    <div className={classes.Header}>
                        <h2>Upload Questionnaire Data</h2>
                        <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={handleClose} /> {/* Modal closes on pressing the cross icon */}
                    </div>
                    <div className={classes.InnerModalContainer}>
                        {!props.loading_start_assessment && !props.fileProcessingComplete
                            ? content
                            : (props.fileProcessingComplete && !props.loading_processing) && <>
                                <div className={classes.ScrollingContainer}>
                                    {table}
                                </div>
                                <div className={classes.ButtonGroup}>
                                    <Button buttonType={"secondary"} clicked={() => props.OnSetProcessingXLSXCSV(false, undefined, false)}>Back</Button>
                                    <Button buttonType={"primary"} clicked={() => props.OnSetStartAssessmentConfirmModal(true)}>Upload</Button>
                                </div>
                            </>}
                    </div>
                </div>
            </Overlay>
        </>
    )
};

export default StartAssessmentModal;