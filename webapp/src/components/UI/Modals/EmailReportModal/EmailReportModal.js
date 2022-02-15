import React, { useEffect, useState } from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './EmailReportModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import Button from '../../Button/Button'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../Spinner/Spinner'
import FeedbackGlobal from '../../FeedbackGlobal/FeedbackGlobal'

const EmailReportModal = (props) => {
    const [state, setState] = useState({
        values: {},
        setSubmitting: "",
        resetForm: ""
    })

    const emailSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    if (!props.sendingEmail && props.sendingEmailComplete) {
        setTimeout(() => {
            state.setSubmitting()
            state.resetForm()
            props.OnSetEmailReportModal(false)
        }, 2000)
    }

    const closeHandler = ()=>{
        document.getElementById("resethidden").click(); 
        props.close();
    }

    return (
        <Overlay show={props.show} close={closeHandler} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : [classes.ModalVisible, classes.HideModal].join(' ')}>
                <div className={classes.Header}>
                    <h2>Send email to: {props.fullname}</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={closeHandler} /> {/* Modal closes on pressing the cross icon */}
                </div>
                {
                    <div className={classes.InnerModalContainer}>
                        {props.sendingEmail && !props.error ? <Spinner calledLocation="DataAnalysis" loadingMessage="Let's hope this works..."/> : props.sendingEmailComplete ? <FeedbackGlobal type="Success" successMessage="Successfully sent!" /> :
                            props.error ? <FeedbackGlobal type="Fail" error={"Email failed. Please check your network connection and try again!"} errorLocation={"emailReport"} OnSetAssessmentError={props.OnSetAssessmentError} cancelError={props.close} /> :
                                <>
                                    <p>Please ensure the email is correct. If an email was not provided by {props.fullname} then please fill it in below.</p>
                                    <Formik
                                        initialValues={{
                                            email: props.email,
                                            message: ''
                                        }}
                                        validationSchema={emailSchema}
                                        onSubmit={(values, { setSubmitting, resetForm}) => {
                                            //code for sending the email - pass values.email and values.message
                                            setState({ ...state, values: values, setSubmitting: setSubmitting, resetForm: resetForm })
                                            props.OnEmailReport(props.token, props.assessment_id, values.email, values.message)
                                        }}
                                    >
                                        {(formProps) => (
                                            <Form className={classes.Form}>
                                                <button onClick={e => { e.preventDefault(); formProps.resetForm(); }} id="resethidden" className={classes.HideButton}></button>
                                                <div style={{ display: "flex" }}>
                                                    <label htmlFor="email">Email</label><ErrorMessage name="email" render={msg => <div className={classes.ErrorMessage}>[{msg}]</div>} />
                                                </div>
                                                <Field name="email" type="email" className={classes.Input} placeholder="example@example.com" id="email" />

                                                <label htmlFor="message" className={classes.MessageLabel}>Message</label>
                                                <Field name="message" type="text" as="textarea" className={classes.TextArea} placeholder="Write a message here..." id="message" />

                                                <div className={classes.ButtonGroup}>
                                                    <Button clicked={closeHandler} buttonType={"secondary"} >Cancel</Button>
                                                    <button type="submit" className={classes.Button}>Send</button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </>
                        }
                    </div>
                }

            </div>
        </Overlay>
    )
}

export default EmailReportModal