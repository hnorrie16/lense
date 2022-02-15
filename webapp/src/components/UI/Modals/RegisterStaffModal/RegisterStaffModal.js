import React, { useEffect, useState } from 'react'
import Overlay from '../../Overlay/Overlay';
import classes from './RegisterStaffModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import Button from '../../Button/Button'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Spinner from '../../../UI/Spinner/Spinner'
import FeedbackGlobal from '../../../UI/FeedbackGlobal/FeedbackGlobal'

const contactRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    contact_number: Yup.string().matches(contactRegExp, 'Contact number is not valid').required("Required"),
    email: Yup.string().email('Invalid email').required('Required'),
});


const RegisterStaffModal = (props) => {
    const [state, setState] = useState({
        values: {},
        setSubmitting: "",
        resetForm: ""
    })

    if (!props.loadingRegisterStaff && props.registeringStaffComplete) {
        setTimeout(() => {
            state.setSubmitting()
            props.OnSetRegisterStaffConfirmModal(false)
            props.close()
            state.resetForm()
            props.OnSetRegisteringStaffComplete(false)
        }, 2000)
    }

    const closeAll = () => {
        props.OnSetRegisterStaffConfirmModal(false)
    }

    const closeHandler = ()=>{
        document.getElementById("resethidden").click();
        props.close();
    }

    return (
        <>
            <ConfirmModal
                show={props.showRegisterStaffConfirmModal}
                close={() => props.OnSetRegisterStaffConfirmModal(false)}
                classCustom={classes.ConfirmModalCustom}
                removeHeading={props.registeringStaffComplete || props.error}
            >{!props.loadingRegisterStaff
                ? !props.registeringStaffComplete
                    ? !props.error
                        ? <><p>By clicking confirm you are agreeing to register <strong>{state.values.fullname}</strong> as a Staff member.</p>
                            <div className={classes.ButtonGroup}>
                                <Button buttonType={"secondary"} clicked={() => props.OnSetRegisterStaffConfirmModal(false)}>Cancel</Button>
                                <Button buttonType={"primary"} clicked={() => props.OnRegisterStaffUser(props.token, state.values)}>Confirm</Button>
                            </div> </>
                        : <FeedbackGlobal type="Fail" error={props.error === "ER_DUP_ENTRY" ? "Email address already exists!" : null} errorLocation={"register"} OnSetAssessmentError={closeAll} cancelError={closeAll} />
                    : <FeedbackGlobal type="Success" />
                : <Spinner calledLocation="Questionnaire" loadingMessage="Saving changes..." />}
            </ConfirmModal>
            <Overlay show={props.show} close={closeHandler} classCustom={props.classCustom}>
                <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : [classes.ModalVisible, classes.HideModal].join(' ')}>
                    <div className={classes.Header}>
                        <h2>Register Staff</h2>
                        <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={closeHandler} /> {/* Modal closes on pressing the cross icon */}
                    </div>
                    <div className={classes.InnerModalContainer}>
                        <Formik
                            initialValues={{
                                fullname: '',
                                role: "staff",
                                contact_number: '',
                                email: '',
                            }}
                            validationSchema={RegisterSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setState({ ...state, values: values, setSubmitting: setSubmitting, resetForm: resetForm })
                                props.OnSetRegisterStaffConfirmModal(true)
                            }}
                        >
                            {(formProps) => (
                                <Form className={classes.Form}>
                                    <button onClick={e => { e.preventDefault(); formProps.resetForm(); }} id="resethidden" className={classes.HideButton}></button>
                                    <div style={{ display: "flex" }}>
                                        <label htmlFor="fullname">Full name</label><ErrorMessage name="fullname" render={msg => <div className={classes.ErrorMessage}>[{msg}]</div>} />
                                    </div>
                                    <Field name="fullname" className={classes.Input} id="fullname" />
                                    <div style={{ display: "flex" }}>
                                        <label htmlFor="contact_number">Contact number</label><ErrorMessage name="contact_number" render={msg => <div className={classes.ErrorMessage}>[{msg}]</div>} />
                                    </div>
                                    <Field name="contact_number" className={classes.Input} id="contact_number" />
                                    <div style={{ display: "flex" }}>
                                        <label htmlFor="email">Email</label><ErrorMessage name="email" render={msg => <div className={classes.ErrorMessage}>[{msg}]</div>} />
                                    </div>
                                    <Field name="email" type="email" className={classes.Input} id="email" />

                                    <div className={classes.ButtonGroup}>
                                        <Button buttonType={"secondary"} clicked ={closeHandler}>Cancel</Button>
                                        <button className={classes.Button} type="submit">Register</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </Overlay>
        </>
    )
}

export default RegisterStaffModal