import React from 'react'
import classes from './StartAssessmentFeedback.module.css'
import Button from '../../UI/Button/Button'
import ErrorIcon from '../../../Assets/Icons/error.svg'

const StartAssessmentFeedback = (props) => (
    <div className={classes.Container}>
        <div className={classes.ImageContainer}>
            {/* 
                : <div className={classes.animationctn}>
                    <div className={[classes.icon, classes.iconordersuccess, classes.svg].join(' ')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                            <g fill="none" stroke="#F44812" stroke-width="2">
                                <circle cx="77" cy="77" r="40" style={{ "stroke-dasharray": "480px 480px", "stroke-dashoffset": "960px" }}></circle>
                                <circle id="colored" fill="#F44812" cx="77" cy="77" r="40" style={{ "stroke-dasharray": "480px 480px", "stroke-dashoffset": "960px" }}></circle>
                                <polyline className="st0" stroke="#fff" stroke-width="8" points="43.5,77.8  112.2,77.8 " style={{ "stroke-dasharray": "100px, 100px", "stroke-dashoffset": "200px" }} />
                            </g>
                        </svg>
                    </div>
                </div>
            } */}

            {props.type === "Success" ? <svg className={classes.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={classes.checkmark__circle} cx="26" cy="26" r="25" fill="none" />
                <path className={classes.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg> : <img src={ErrorIcon} alt="error icon" />}
            <ul className={classes.SuccessList}>
                <li>Number of clients created: {props.totalClients}</li>
                <li>Number of assessments started: {props.totalAssessments}</li>

            </ul>
            {props.error &&
                <ul className={classes.FailList}>
                    <li>Issue: {props.error}</li>
                    <li>Location of issue: {props.failedAt}</li>
                </ul>
            }
        </div>
        <div className={classes.ButtonGroup}>
            <Button buttonType={"primary"} clicked={props.handleClose}>Done</Button>
        </div>
    </div>
)


export default StartAssessmentFeedback