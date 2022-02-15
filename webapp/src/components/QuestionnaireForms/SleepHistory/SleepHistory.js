import React, { useState } from 'react'
import classes from './SleepHistory.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const SleepHistory = (props) => {

    const formik = props.formik

    return (
        <form className={classes.Form}>
            <Input
                label="Please describe your main sleep complaint?"
                id="primary_complaint"
                name="primary_complaint"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.primary_complaint}
                invalid={checkIfDefined(formik.errors.primary_complaint, false) ? true : false}
                touched={checkIfDefined(formik.touched.primary_complaint, false) ? true : false}
                errorMessage={formik.errors.primary_complaint}
            />
            <Input
                label="Have you previously been diagnosed with any of the following sleep-related conditions?"
                id="conditions"
                name="conditions"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.conditions}
                invalid={checkIfDefined(formik.errors.conditions, false) ? true : false}
                touched={checkIfDefined(formik.touched.conditions, false) ? true : false}
                errorMessage={formik.errors.conditions}
            />
            <Input
                label="Use this space if you would like to provide any additional information to the question above."
                id="additional_information"
                name="additional_information"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                invalid={checkIfDefined(formik.errors.additional_information, false) ? true : false}
                touched={checkIfDefined(formik.touched.additional_information, false) ? true : false}
                errorMessage={formik.errors.additional_information}
            />
            <Input
                label="How long have you had a problem with your sleep (specify weeks, months or years)?"
                id="period"
                name="period"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.period}
                invalid={checkIfDefined(formik.errors.period, false) ? true : false}
                touched={checkIfDefined(formik.touched.period, false) ? true : false}
                errorMessage={formik.errors.period}
            />
            <Input
                label="During the past month, on how many nights each week have you had a problem with your sleep?"
                id="problem_nights"
                name="problem_nights"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.problem_nights}
                invalid={checkIfDefined(formik.errors.problem_nights, false) ? true : false}
                touched={checkIfDefined(formik.touched.problem_nights, false) ? true : false}
                errorMessage={formik.errors.problem_nights}
            />
            <Input
                label="On a scale of 1 to 10, how severe is your sleep problem to you?"
                id="severity"
                name="severity"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.severity}
                invalid={checkIfDefined(formik.errors.fullname, false) ? true : false}
                touched={checkIfDefined(formik.touched.severity, false) ? true : false}
                errorMessage={formik.errors.severity}
            />
            <Input
                label="Sleep-related symptoms"
                id="symptoms"
                name="symptoms"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.symptoms}
                invalid={checkIfDefined(formik.errors.symptoms, false) ? true : false}
                touched={checkIfDefined(formik.touched.symptoms, false) ? true : false}
                errorMessage={formik.errors.symptoms}
            />
            <Input
                label="What time do you usually go to sleep?"
                id="sleep_time"
                name="sleep_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_time}
                invalid={checkIfDefined(formik.errors.sleep_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_time, false) ? true : false}
                errorMessage={formik.errors.sleep_time}
            />
            <Input
                label="How long do you think it usually takes you to fall asleep at night (minutes)?"
                id="to_sleep_duration"
                name="to_sleep_duration"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.to_sleep_duration}
                invalid={checkIfDefined(formik.errors.to_sleep_duration, false) ? true : false}
                touched={checkIfDefined(formik.touched.to_sleep_duration, false) ? true : false}
                errorMessage={formik.errors.to_sleep_duration}
            />
            <Input
                label="What time do you usually wake-up?"
                id="wakeup_time"
                name="wakeup_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.wakeup_time}
                invalid={checkIfDefined(formik.errors.wakeup_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.wakeup_time, false) ? true : false}
                errorMessage={formik.errors.wakeup_time}
            />
            <Input
                label="How much sleep do you think you usually get each night (hours)?"
                id="sleep_duration"
                name="sleep_duration"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_duration}
                invalid={checkIfDefined(formik.errors.sleep_duration, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_duration, false) ? true : false}
                errorMessage={formik.errors.sleep_duration}
            />
            <Input
                label="On a scale of 1 to 10, how would you rate the quality of your sleep?"
                id="sleep_quality"
                name="sleep_quality"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_quality}
                invalid={checkIfDefined(formik.errors.sleep_quality, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_quality, false) ? true : false}
                errorMessage={formik.errors.sleep_quality}
            />
            <Input
                label="One a scale of 1 to 10, how restorative or refreshing do you think your sleep is?"
                id="restorative_rating"
                name="restorative_rating"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.restorative_rating}
                invalid={checkIfDefined(formik.errors.restorative_rating, false) ? true : false}
                touched={checkIfDefined(formik.touched.restorative_rating, false) ? true : false}
                errorMessage={formik.errors.restorative_rating}
            />
            <Input
                label="What best describes your daytime napping patterns?"
                id="napping_pattern"
                name="napping_pattern"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.napping_pattern}
                invalid={checkIfDefined(formik.errors.napping_pattern, false) ? true : false}
                touched={checkIfDefined(formik.touched.napping_pattern, false) ? true : false}
                errorMessage={formik.errors.napping_pattern}
            />
            <Input
                label="If you nap, what time of day do you usually nap and for how long?"
                id="nap_period"
                name="nap_period"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.nap_period}
                invalid={checkIfDefined(formik.errors.nap_period, false) ? true : false}
                touched={checkIfDefined(formik.touched.nap_period, false) ? true : false}
                errorMessage={formik.errors.nap_period}
                
            />
            <Input
                label="Which of the following most often interferes with your sleep?"
                id="sleep_interferences"
                name="sleep_interferences"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_interferences}
                invalid={checkIfDefined(formik.errors.sleep_interferences, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_interferences, false) ? true : false}
                errorMessage={formik.errors.sleep_interferences}
            />
            <Input
                label="In the last month:"
                id="last_month"
                name="last_month"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.last_month}
                invalid={checkIfDefined(formik.errors.last_month, false) ? true : false}
                touched={checkIfDefined(formik.touched.last_month, false) ? true : false}
                errorMessage={formik.errors.last_month}
            />
            <Input
                label="How alert are you during the day time?"
                id="alertness"
                name="alertness"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.alertness}
                invalid={checkIfDefined(formik.errors.alertness, false) ? true : false}
                touched={checkIfDefined(formik.touched.alertness, false) ? true : false}
                errorMessage={formik.errors.alertness}
            />
        </form>
    )
}

export default SleepHistory