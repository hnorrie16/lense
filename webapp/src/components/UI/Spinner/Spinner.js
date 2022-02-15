import React from 'react'
import classes from './Spinner.module.css'

const Spinner = (props) => {

    return props.calledLocation === "Assessment" || props.calledLocation === "ReportGeneration" ? (
        <div className={props.calledLocation === "ReportGeneration" ? classes.Container_reportgenerating : classes.Container}>
            <div className={classes.loader}></div>
            <h3>{props.loadingMessage}</h3>
        </div>

    ) : props.calledLocation === "StartAssessment" ?
            <div className={classes.Container_startassessment}>
                <div className={classes.loader}></div>
                <h3>{props.loadingMessage}</h3>
            </div>
            :
            props.calledLocation === "DataAnalysis" ?
                <div className={classes.Container_startassessment}>
                    <div className={classes.loader}></div>
                    <h3>{props.loadingMessage}</h3>
                </div> :
            (
        <div className={classes.loader}></div>
    )
}


export default Spinner