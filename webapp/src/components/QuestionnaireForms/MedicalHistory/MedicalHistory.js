import React, { useState } from 'react'
import classes from './MedicalHistory.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const MedicalHistory = (props) => {

    const formik = props.formik

    return (
        <form className={classes.Form}>
            <Input
                label="Do you suffer from or have you been diagnosed with any medical or psychiatric condition(s) (current or past)?"
                id="medical_conditions"
                name="medical_conditions"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.medical_conditions}
                invalid={checkIfDefined(formik.errors.medical_conditions, false) ? true : false}
                touched={checkIfDefined(formik.touched.medical_conditions, false) ? true : false}
                errorMessage={formik.errors.medical_conditions}
            />
            <Input
                label="If yes, please provide the name of the condition(s) and date(s) diagnosed."
                id="name_date_diagnosed"
                name="name_date_diagnosed"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.name_date_diagnosed}
                invalid={checkIfDefined(formik.errors.name_date_diagnosed, false) ? true : false}
                touched={checkIfDefined(formik.touched.name_date_diagnosed, false) ? true : false}
                errorMessage={formik.errors.name_date_diagnosed}
            />
            <Input
                label="Ladies only: Are you ..."
                id="ladies_only"
                name="ladies_only"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.ladies_only}
                invalid={checkIfDefined(formik.errors.ladies_only, false) ? true : false}
                touched={checkIfDefined(formik.touched.ladies_only, false) ? true : false}
                errorMessage={formik.errors.ladies_only}
            />
            <Input
                label="Do you have high blood pressure?"
                id="high_blood_pressure"
                name="high_blood_pressure"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.high_blood_pressure}
                invalid={checkIfDefined(formik.errors.high_blood_pressure, false) ? true : false}
                touched={checkIfDefined(formik.touched.high_blood_pressure, false) ? true : false}
                errorMessage={formik.errors.high_blood_pressure}
            />
            <Input
                label="Do you take any medication prescribed by your doctor (e.g. for hypertension, anxiety)?"
                id="medication"
                name="medication"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.medication}
                invalid={checkIfDefined(formik.errors.medication, false) ? true : false}
                touched={checkIfDefined(formik.touched.medication, false) ? true : false}
                errorMessage={formik.errors.medication}
            />
            <Input
                label="If yes, please list the name of the medication(s), purpose, dose, time of day taken, and years taken."
                id="medication_details"
                name="medication_details"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.medication_details}
                invalid={checkIfDefined(formik.errors.medication_details, false) ? true : false}
                touched={checkIfDefined(formik.touched.medication_details, false) ? true : false}
                errorMessage={formik.errors.medication_details}
            />
            <Input
                label="Do you currently or have you in the past used any medication or supplement specifically to help you with sleep (prescribed or over-the-counter)?"
                id="sleep_med"
                name="sleep_med"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_med}
                invalid={checkIfDefined(formik.errors.sleep_med, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_med, false) ? true : false}
                errorMessage={formik.errors.sleep_med}
            />
            <Input
                label="If yes, please list the name of the sleep aid, dose and years taken."
                id="sleep_med_details"
                name="sleep_med_details"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_med_details}
                invalid={checkIfDefined(formik.errors.sleep_med_details, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_med_details, false) ? true : false}
                errorMessage={formik.errors.sleep_med_details}
            />
            <Input
                label={"During the past month, how often have you taken medicine (prescribed or \"over the counter\") to help you sleep?"}
                id="medicine_usage"
                name="medicine_usage"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.medicine_usage}
                invalid={checkIfDefined(formik.errors.medicine_usage, false) ? true : false}
                touched={checkIfDefined(formik.touched.medicine_usage, false) ? true : false}
                errorMessage={formik.errors.medicine_usage}
            />
        </form>
    )
}

export default MedicalHistory