import React from 'react';
import classes from './ReportGeneration.module.css'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import EmailReportModal from '../../UI/Modals/EmailReportModal/EmailReportModal'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReportGeneration = (props) => {
    return (
        <>
            {
                <EmailReportModal
                    close={() => props.OnSetEmailReportModal(false)}
                    show={props.showEmailReportModal}
                    fullname={props.client_details.fullname}
                    email={props.client_details.email}
                    OnEmailReport={props.OnEmailReport}
                    assessment_id={props.assessment_id}
                    sendingEmail={props.sendingEmail}
                    sendingEmailComplete={props.sendingEmailComplete}
                    error={props.emailError}
                    OnSetEmailReportModal={props.OnSetEmailReportModal}
                    OnSetAssessmentError={props.OnSetAssessmentError}
                    token={props.token}
                />
            }

            <div className={classes.Container}>
                <div className={classes.Header}>
                    <h5>Report generation</h5>
                    <li className={classes.LineRule}></li>
                </div>
                <li className={classes.LineRule}></li>
            </div>
            <div className={classes.PDFViewerContainer}>
                <div>
                    {
                        props.error ? <h3> Something went wrong, please try again! </h3>
                            :
                            props.report !== undefined ?
                                <Document
                                    file={{ url: props.report.file }}
                                >
                                    {[1, 2, 3, 4, 5, 6].map(page => (
                                        <Page key={page} className={classes.Page} pageNumber={page} />
                                    ))}
                                </Document>
                                : <h3>No report found</h3>
                    }
                    {props.report ? <div className={classes.ActionContainer}>
                        <div className={classes.ActionButton} onClick={() => props.OnSetEmailReportModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgb(73, 77, 83)" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                            </svg>
                        </div>
                        <a href={props.report.file} className={classes.ActionButton} target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="rgb(73, 77, 83)" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />

                            </svg>
                        </a>
                        {/* <iframe src={props.report.file} title={props.report.file}></iframe> */}
                        {/* <form method="get" action={props.report.file}>
                            <button className={classes.ActionButton} type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgb(73, 77, 83)" className="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
                                </svg>
                            </button>
                        </form> */}
                    </div> : null}
                </div>
            </div >
        </>
    )
}

export default ReportGeneration