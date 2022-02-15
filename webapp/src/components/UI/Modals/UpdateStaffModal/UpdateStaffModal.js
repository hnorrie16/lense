import React, { useEffect, useState } from 'react'
import Overlay from '../../Overlay/Overlay';
import classes from './UpdateStaffModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import Button from '../../Button/Button'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Spinner from '../../../UI/Spinner/Spinner'
import FeedbackGlobal from '../../../UI/FeedbackGlobal/FeedbackGlobal'

const contactRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const UpdateSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    contact_number: Yup.string().matches(contactRegExp, 'Contact number is not valid').required("Required"),
    email: Yup.string().email('Invalid email').required('Required'),
});

const UpdateStaffModal = (props) => {
    const [state, setState] = useState({
        values: {
                fullname: props.userDetails.fullname,
                contact_number: props.userDetails.contact_number,
                email: props.userDetails.email
            },
        setSubmitting: "",
    })

    if (!props.loadingUpdatingStaff && props.updatingStaffComplete) {
        setTimeout(() => {
            console.log("close")
            state.setSubmitting()
            props.OnSetUpdateStaffConfirmModal(false)
            props.close()
            props.OnSetUpdatingStaffComplete(false)
        }, 2000)
    }

    const closeAll = () => {
        props.OnSetUpdateStaffConfirmModal(false)
    }

    const closeHandler = ()=>{
        //document.getElementById("resethidden").click(); 
        props.close();
    }

    return (
        <>
            <ConfirmModal
                show={props.showUpdateStaffConfirmModal}
                close={() => props.OnSetUpdateStaffConfirmModal(false)}
                classCustom={classes.ConfirmModalCustom}
                removeHeading={props.updatingStaffComplete || props.error}
            >{!props.loadingUpdateStaff
                ? !props.updatingStaffComplete
                    ? !props.error
                        ? <><p>By clicking confirm you are agreeing to update <strong>{state.values.fullname}</strong>.</p>
                            <div className={classes.ButtonGroup}>
                                <Button buttonType={"secondary"} clicked={() => props.OnSetUpdateStaffConfirmModal(false)}>Cancel</Button>
                                <Button buttonType={"primary"} clicked={() => props.OnUpdateStaffUser(props.token, props.userId, state.values)}>Confirm</Button>
                            </div> </>
                        : <FeedbackGlobal type="Fail" error={props.error === "ER_DUP_ENTRY" ? "Email address already exists!" : null} errorLocation={"register"} OnSetAssessmentError={closeAll} cancelError={closeAll} />
                    : <FeedbackGlobal type="Success" />
                : <Spinner calledLocation="Questionnaire" loadingMessage="Saving changes..." />}
            </ConfirmModal>
            <Overlay show={props.show} close={closeHandler} classCustom={props.classCustom}>
                <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : [classes.ModalVisible, classes.HideModal].join(' ')}>
                    <div className={classes.Header}>
                        <h2>Edit Your Details</h2>
                        <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={closeHandler} /> {/* Modal closes on pressing the cross icon */}
                    </div>
                    <div className={classes.InnerModalContainer}>
                        <Formik
                            // initialValues={{
                            //     fullname: props.userDetails.fullname,
                            //     contact_number: props.userDetails.contact_number,
                            //     email: props.userDetails.email
                            // }}
                            initialValues={state.values}
                            validationSchema={UpdateSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setState({ ...state, values: values, setSubmitting: setSubmitting })
                                props.OnSetUpdateStaffConfirmModal(true)
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
                                        <button className={classes.Button} type="submit">Update</button>
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

export default UpdateStaffModal