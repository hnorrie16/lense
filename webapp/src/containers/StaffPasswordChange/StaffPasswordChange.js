/* 
    This is the container for the changing of a staff member's password
*/
import React, { useEffect } from 'react';
import classes from './StaffPasswordChange.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Navigate } from 'react-router-dom';
// import PasswordStengthMeter from '../../components/UI/PasswordStrengthMeter/PasswordStrengthMeter'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    confirm_password: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

const StaffPasswordChange = (props) => {

    useEffect(() => {
        props.OnVerifyToken(props.location.search.substring(6))
    }, [])

    let form = (
        <Formik
            initialValues={{
                password: '',
                confirm_password: '',
            }}
            validationSchema={Schema}
            onSubmit={(values, { setSubmitting }) => {
                // if (values.password === values.confirm_password) {
                    props.OnChangePassword(props.email, values.password, values.confirm_password);
                // }
                // setSubmitting(false)
            }}
        >
            {({ errors, touched }) => (
                <Form className={classes.Form}>
                    <label htmlFor="password">New password</label>
                    <Field name="password" type="password" className={classes.Input} />
                    <ErrorMessage name="password" />

                    <label htmlFor="confirm_password">Confirm password</label>
                    <Field name="confirm_password" type="password" className={classes.Input} />
                    <ErrorMessage name="confirm_password" />

                    <div className={classes.ButtonGroup}>
                        {/* <Button buttonType={"secondary"}>Cancel</Button> */}
                        {/* <Button buttonType={"primary"} clicked={ }>Register</Button> */}
                        <button type="submit" className={classes.Button}>Save</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
    const signInRedirect = props.passwordChangeSuccess && <Navigate to="/signin" />

    const content =
        props.loading
            ? <h2>Loading</h2>
            : !props.loading && !props.tokenVerified
                ? <h2>Token has expired</h2>
                : <div className={classes.Container}>
                    <h1>Reset password</h1>
                    <p><strong>Please ensure to set a strong password that is different from other passwords you use.</strong></p>
                    {/* <h3 className={classes.ErrorMessage}>{errMsg}</h3> */}
                    {form}
                    {signInRedirect}
                </div>
    return (
        content
    )
}
//this is used for getting the relevant data from the store which the components in this container require
const mapStateToProps = state => {
    return {
        passwordChangeSuccess: state.auth.passwordChangeSuccess,
        email: state.auth.email,
        tokenVerified: state.auth.tokenVerified,
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
}
//This allows dispatching action functions as props
const mapDispatchToProps = dispatch => {
    return {
        OnChangePassword: (email, password, confirmPassword) => dispatch(actions.changePassword(email, password, confirmPassword)),
        OnVerifyToken: (token) => dispatch(actions.verifyToken(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffPasswordChange);