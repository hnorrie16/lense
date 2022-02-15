import React from 'react'
import classes from './Auth.module.css'
import Logo from '../../Assets/Images/Sleep Science Logo File.png'
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';

const Auth = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            props.OnAuth(values)
        },
    });

    let redirect = null

    if (props.isAuthenticated) {
        redirect = <Redirect to="/clients" />
    }

    const errorMsg = props.loading ? null : props.error ? props.error : null


    return (
        <div className={classes.Container} style={{display: 'flex', justifyContent: 'center'}}>
                <div className={classes.Box}>
                    <h4>Welcome to LenseCODESk</h4>
                    <h1>Log into your Account</h1>
                    <p> {errorMsg} </p>

                    <div>
                        <form onSubmit={formik.handleSubmit} className={classes.Form}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className={classes.EmailInput}
                                placeholder="example@example.com"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className={classes.PasswordInput}
                                placeholder="Password"
                            />
                            <div className={classes.SignIn}>
                                {!props.loading
                                    ? <button type="submit">Sign In</button>
                                    : <button disabled={true} type="button"><i className="fa fa-circle-o-notch fa-spin"></i></button>
                                }
                            </div>
                        </form>

                    </div>

                </div>
            {redirect}
        </div>
    )
}

//this is used for getting the relevant data from the store which the components in this container require
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    };
}
//This allows dispatching action functions as props
const mapDispatchToProps = dispatch => {
    return {
        OnAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)