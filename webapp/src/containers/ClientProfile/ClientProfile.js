import React, { useState, useRef, useEffect } from 'react'
import classes from './ClientProfile.module.css'
import AboutYou from '../../components/QuestionnaireForms/AboutYou/AboutYou'
import * as actions from '../../store/actions/clients';
import { connect } from 'react-redux';
import { checkIfDefined } from '../../shared/Utility'
import Spinner from '../../components/UI/Spinner/Spinner'
import Button from '../../components/UI/Button/Button'
import ConfirmModal from '../../components/UI/Modals/ConfirmModal/ConfirmModal'
import FeedbackGlobal from '../../components/UI/FeedbackGlobal/FeedbackGlobal'
import { useFormik } from 'formik';
import * as Yup from "yup";

const ClientProfile = (props) => {

    if (!props.loading_posting_client_update && props.updating_client_complete) {
        setTimeout(() => {
            props.OnSetClientUpdateConfirmModal(false)
            props.OnSetUpdatingClientComplete(false)
        }, 2000)
    }

    
    const clientDetails = checkIfDefined(props.client, {})
    const formikAboutYou = useFormik({
        initialValues: checkIfDefined(props.client, {}),
        validationSchema: Yup.object({
            age: clientDetails.age !== undefined && clientDetails.age !== null ? Yup.number().typeError("Number required") : null,
            height: clientDetails.height !== undefined && clientDetails.height !== null ? Yup.number().typeError("Number required") : null,
            weight: clientDetails.weight !== undefined && clientDetails.weight !== null ? Yup.number().typeError("Number required") : null,
            waist_circumference: clientDetails.waist_circumference !== undefined && clientDetails.waist_circumference !== null ? Yup.number().typeError("Number required") : null,
            neck_circumference: clientDetails.neck_circumference !== undefined && clientDetails.neck_circumference !== null ? Yup.number().typeError("Number required") : null
        })
    });

    return (
        <>
            <ConfirmModal
                show={props.showClientUpdateConfirmModal}
                close={() => props.OnSetClientUpdateConfirmModal(false)}
                removeHeading={props.error || props.updating_client_complete}
            >{!props.loading_posting_client_update
                ? !props.updating_client_complete
                    ? !props.error
                        ? <> <p>By clicking confirm you are agreeing to <strong>save your changes</strong></p>
                            <div className={classes.ButtonGroup}>
                                <Button buttonType={"secondary"} clicked={() => props.OnSetClientUpdateConfirmModal(false)}>Cancel</Button>
                                <Button buttonType={"primary"} clicked={() => props.OnUpdateClient(props.token, props.client.id, formikAboutYou.values, false)}>Confirm</Button>
                            </div> </>
                        : <FeedbackGlobal type="Fail" error={props.error === "ER_DUP_ENTRY" ? "ID already exists!" : null} OnSetAssessmentError={() => props.OnSetClientUpdateConfirmModal(false)} cancelError={() => props.OnSetClientUpdateConfirmModal(false)} errorLocation={"client_profile"} />
                    : <FeedbackGlobal type="Success" />
                : <Spinner calledLocation="ClientProfile" loadingMessage="Saving changes..." />}
            </ConfirmModal>
            <div className={classes.Container}>
                <div className={classes.Left}>
                    <div className={classes.FormContainer}>
                        {!props.loading_fetch_client
                            ? <AboutYou
                                client_details={props.client}
                                isClientProfile={true}
                                formik={formikAboutYou}
                            />
                            : <Spinner />
                        }
                        <div className={classes.ButtonGroup}>
                            <Button buttonType={"primary"} clicked={() => props.OnSetClientUpdateConfirmModal(true)}>SAVE</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        client: state.clients.client,
        loading_fetch_client: state.clients.loading_fetch_client,
        loading_posting_client_update: state.clients.loading_posting_client_update,
        showClientUpdateConfirmModal: state.clients.showClientUpdateConfirmModal,
        updating_client_complete: state.clients.updating_client_complete,
        error: state.clients.error
    };
}
//can access these function to dispatch actions - via props
const mapDispatchToProps = dispatch => {
    return {
        OnUpdateClient: (token, client_id, updated_client, isArchived) => dispatch(actions.updateClient(token, client_id, updated_client, isArchived)),
        OnSetClientUpdateConfirmModal: (val) => dispatch(actions.setClientUpdateConfirmModal(val)),
        OnSetUpdatingClientComplete: (val) => dispatch(actions.setUpdatingClientComplete(val)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)