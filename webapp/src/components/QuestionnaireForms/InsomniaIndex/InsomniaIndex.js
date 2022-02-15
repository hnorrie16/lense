import React, { useState } from 'react'
import classes from './InsomniaIndex.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const InsomniaIndex = (props) => {

    const formik = props.formik

    return (
        <form className={classes.Form}>
            {/* this needs to be the main heading */}
            <label htmlFor="insomina_severity">They were asked to rate the current severity of their insomnia problem(s) (i.e. last 2 weeks).</label>

            <Input
                label="Difficulty falling asleep"
                id="falling_asleep"
                name="falling_asleep"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.falling_asleep}
                invalid={checkIfDefined(formik.errors.falling_asleep, false) ? true : false}
                touched={checkIfDefined(formik.touched.falling_asleep, false) ? true : false}
                errorMessage={formik.errors.falling_asleep}
            />
            <Input
                label="Difficulty staying asleep"
                id="staying_asleep"
                name="staying_asleep"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.staying_asleep}
                invalid={checkIfDefined(formik.errors.staying_asleep, false) ? true : false}
                touched={checkIfDefined(formik.touched.staying_asleep, false) ? true : false}
                errorMessage={formik.errors.staying_asleep}
            />
            <Input
                label="Problems waking up too early"
                id="waking_early"
                name="waking_early"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.waking_early}
                invalid={checkIfDefined(formik.errors.waking_early, false) ? true : false}
                touched={checkIfDefined(formik.touched.waking_early, false) ? true : false}
                errorMessage={formik.errors.waking_early}
            />
            <Input
                label="How satisfied/dissatisfied are you with your current sleep pattern?"
                id="sleep_satisfaction"
                name="sleep_satisfaction"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_satisfaction}
                invalid={checkIfDefined(formik.errors.sleep_satisfaction, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_satisfaction, false) ? true : false}
                errorMessage={formik.errors.sleep_satisfaction}
            />
            <Input
                label="How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?"
                id="sleep_problem_noticeable"
                name="sleep_problem_noticeable"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sleep_problem_noticeable}
                invalid={checkIfDefined(formik.errors.sleep_problem_noticeable, false) ? true : false}
                touched={checkIfDefined(formik.touched.sleep_problem_noticeable, false) ? true : false}
                errorMessage={formik.errors.sleep_problem_noticeable}
            />
            <Input
                label="How worried/distressed are you about your current sleep problem?"
                id="worried_distressed"
                name="worried_distressed"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.worried_distressed}
                invalid={checkIfDefined(formik.errors.worried_distressed, false) ? true : false}
                touched={checkIfDefined(formik.touched.worried_distressed, false) ? true : false}
                errorMessage={formik.errors.worried_distressed}
            />
            <Input
                label="To what extent do you consider your sleep problem to interfere with your daily functioning (e.g. daytime fatigue, mood, ability to function at work/daily chores, concentration, memory, mood, etc.)?"
                id="daily_functioning"
                name="daily_functioning"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.daily_functioning}
                invalid={checkIfDefined(formik.errors.daily_functioning, false) ? true : false}
                touched={checkIfDefined(formik.touched.daily_functioning, false) ? true : false}
                errorMessage={formik.errors.daily_functioning}
            />
        </form>
    )
}

export default InsomniaIndex