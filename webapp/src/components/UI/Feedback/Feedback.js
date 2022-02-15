import React from 'react'
import classes from './Feedback.module.css'
import Button from '../../UI/Button/Button'
import ErrorIcon from '../../../Assets/Icons/error.svg'
const Feedback = (props) => (
    <div className={classes.Container}>
        {props.type === "Success"
            ? <div className={classes.ImageContainer}>
                <svg className={classes.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className={classes.checkmark__circle} cx="26" cy="26" r="25" fill="none" />
                    <path className={classes.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                {props.successMessage ? <h3>{props.successMessage}</h3> : <h3>Successfuly saved!</h3>}
            </div>
            : <>
                <div className={classes.ImageContainer_error}>
                    <img src={ErrorIcon} alt="error icon" />
                    <p> Oops, something went wrong!<br />Please check your network connection and try again!</p>
                </div>
                <div className={classes.ButtonGroup}>
                    <Button buttonType={"secondary"} clicked={props.cancelError}>Cancel</Button>
                    <Button buttonType={"primary"} clicked={() => props.OnSetAssessmentError("updateAssessment", false)}>Retry</Button>
                </div>
            </>
        }
    </div >
)
export default Feedback