import React from 'react'
import classes from './InterpretationForm.module.css'
import Input from '../UI/Input/Input'
import { checkIfDefined } from '../../shared/Utility'

const InterpretationForm = (props) => {
    const formik = props.formik
    return (
        <form className={classes.Form}>
            <Input
                label="Primary complaint"
                id="primary_complaint"
                name="primary_complaint"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.primary_complaint}
                invalid={checkIfDefined(formik.errors.primary_complaint, false) ? true : false}
                touched = {checkIfDefined(formik.touched.primary_complaint, false) ? true : false}
                errorMessage={formik.errors.primary_complaint}
            />

            <Input
                label="Medical and mental health history"
                id="medical_history"
                name="medical_history"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medical_history}
                invalid={checkIfDefined(formik.errors.medical_history, false) ? true : false}
                touched = {checkIfDefined(formik.touched.medical_history, false) ? true : false}
                errorMessage={formik.errors.medical_history}
            />

            <Input
                label="Current medications / supplements"
                id="current_medication"
                name="current_medication"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.current_medication}
                invalid={checkIfDefined(formik.errors.current_medication, false) ? true : false}
                touched = {checkIfDefined(formik.touched.current_medication, false) ? true : false}
                errorMessage={formik.errors.current_medication}
            />
            <Input
                typeOfInput="textarea"
                label="Risk for common sleep disorders"
                id="risk_disorders"
                name="risk_disorders"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.risk_disorders}
                invalid={checkIfDefined(formik.errors.risk_disorders, false) ? true : false}
                touched = {checkIfDefined(formik.touched.risk_disorders, false) ? true : false}
                errorMessage={formik.errors.risk_disorders}
            />
            <Input
                label="Sleep assessment"
                id="sleep_assessment"
                name="sleep_assessment"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_assessment}
                invalid={checkIfDefined(formik.errors.sleep_assessment, false) ? true : false}
                touched = {checkIfDefined(formik.touched.sleep_assessment, false) ? true : false}
                errorMessage={formik.errors.sleep_assessment}
            />
            <Input
                typeOfInput="textarea"
                label="Way forward"
                id="way_forward"
                name="way_forward"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.way_forward}
                invalid={checkIfDefined(formik.errors.way_forward, false) ? true : false}
                touched = {checkIfDefined(formik.touched.way_forward, false) ? true : false}
                errorMessage={formik.errors.way_forward}
            />

        </form>
    )
}

export default InterpretationForm