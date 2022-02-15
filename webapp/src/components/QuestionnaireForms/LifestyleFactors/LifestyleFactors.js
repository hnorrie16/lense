import React, { useState } from 'react'
import classes from './LifestyleFactors.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const LifestyleFactors = (props) => {

    const formik = props.formik
    return (
        <form className={classes.Form}>
            <Input
                label="Do you have young children living with you?"
                id="children"
                name="children"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.children}
                invalid={checkIfDefined(formik.errors.children, false) ? true : false}
                touched={checkIfDefined(formik.touched.children, false) ? true : false}
                errorMessage={formik.errors.children}
            />
            <Input
                label="If so, how old are they and do they impact on your sleep?"
                id="children_details"
                name="children_details"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.children_details}
                invalid={checkIfDefined(formik.errors.children_details, false) ? true : false}
                touched={checkIfDefined(formik.touched.children_details, false) ? true : false}
                errorMessage={formik.errors.children_details}
            />
            <Input
                label="Do you have a bed partner?"
                id="bed_partner"
                name="bed_partner"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.bed_partner}
                invalid={checkIfDefined(formik.errors.bed_partner, false) ? true : false}
                touched={checkIfDefined(formik.touched.bed_partner, false) ? true : false}
                errorMessage={formik.errors.bed_partner}
            />
            <Input
                label="If yes, is there anything about your bed partner that challenges your sleep?"
                id="partner_details"
                name="partner_details"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.partner_details}
                invalid={checkIfDefined(formik.errors.partner_details, false) ? true : false}
                touched={checkIfDefined(formik.touched.partner_details, false) ? true : false}
                errorMessage={formik.errors.partner_details}
            />
            <Input
                label="What best describes your current work status?"
                id="work_status"
                name="work_status"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.work_status}
                invalid={checkIfDefined(formik.errors.work_status, false) ? true : false}
                touched={checkIfDefined(formik.touched.work_status, false) ? true : false}
                errorMessage={formik.errors.work_status}
            />
            <Input
                label="If you do work, how many days per week do you work?"
                id="work_days"
                name="work_days"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.work_days}
                invalid={checkIfDefined(formik.errors.work_days, false) ? true : false}
                touched={checkIfDefined(formik.touched.work_days, false) ? true : false}
                errorMessage={formik.errors.work_days}
            />

            <Input
                label="How many hours per week do you work?"
                id="work_hours"
                name="work_hours"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.work_hours}
                invalid={checkIfDefined(formik.errors.work_hours, false) ? true : false}
                touched={checkIfDefined(formik.touched.work_hours, false) ? true : false}
                errorMessage={formik.errors.work_hours}
            />
            <Input
                label="What best describes your usual work schedule?"
                id="work_schedule"
                name="work_schedule"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.work_schedule}
                invalid={checkIfDefined(formik.errors.work_schedule, false) ? true : false}
                touched={checkIfDefined(formik.touched.work_schedule, false) ? true : false}
                errorMessage={formik.errors.work_schedule}
            />
            <Input
                label="What time do you usually start work?"
                id="start_work_time"
                name="start_work_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.start_work_time}
                invalid={checkIfDefined(formik.errors.start_work_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.start_work_time, false) ? true : false}
                errorMessage={formik.errors.start_work_time}
            />
            <Input
                label="What time do you usually end work?"
                id="end_work_time"
                name="end_work_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.end_work_time}
                invalid={checkIfDefined(formik.errors.end_work_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.end_work_time, false) ? true : false}
                errorMessage={formik.errors.end_work_time}
            />
            <Input
                label="What time do you have to leave home in the morning to get work on time?"
                id="leave_time"
                name="leave_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.leave_time}
                invalid={checkIfDefined(formik.errors.leave_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.leave_time, false) ? true : false}
                errorMessage={formik.errors.leave_time}
            />
            <Input
                label="What time do you get home from work in the afternoon / evening?"
                id="home_time"
                name="home_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.home_time}
                invalid={checkIfDefined(formik.errors.home_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.home_time, false) ? true : false}
                errorMessage={formik.errors.home_time}
            />
            <Input
                label="Please select all that apply"
                id="selection"
                name="selection"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.selection}
                invalid={checkIfDefined(formik.errors.selection, false) ? true : false}
                touched={checkIfDefined(formik.touched.selection, false) ? true : false}
                errorMessage={formik.errors.selection}
            />
            <Input
                label="How many drinks containing alcohol (e.g. 1 beer =250ml, 1 tot spirits=25ml, 1 small glass wine=125ml) do you usually have per week?"
                id="alcoholic_drinks"
                name="alcoholic_drinks"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.alcoholic_drinks}
                invalid={checkIfDefined(formik.errors.alcoholic_drinks, false) ? true : false}
                touched={checkIfDefined(formik.touched.alcoholic_drinks, false) ? true : false}
                errorMessage={formik.errors.alcoholic_drinks}
            />
            <Input
                label="How many caffeine-containing drinks/products do you usually have per day?"
                id="caffeine_drinks"
                name="caffeine_drinks"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.caffeine_drinks}
                invalid={checkIfDefined(formik.errors.caffeine_drinks, false) ? true : false}
                touched={checkIfDefined(formik.touched.caffeine_drinks, false) ? true : false}
                errorMessage={formik.errors.caffeine_drinks}
            />
            <Input
                label="How many nicotine products do you usually have per day?"
                id="nicotine_products"
                name="nicotine_products"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.nicotine_products}
                invalid={checkIfDefined(formik.errors.nicotine_products, false) ? true : false}
                touched={checkIfDefined(formik.touched.nicotine_products, false) ? true : false}
                errorMessage={formik.errors.nicotine_products}
            />
            <Input
                label="What recreational drugs do you use and how often (per week)?"
                id="recreation_drugs"
                name="recreation_drugs"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.recreation_drugs}
                invalid={checkIfDefined(formik.errors.recreation_drugs, false) ? true : false}
                touched={checkIfDefined(formik.touched.recreation_drugs, false) ? true : false}
                errorMessage={formik.errors.recreation_drugs}
            />
            <Input
                label="Do you usually participate in regular physical activity?"
                id="physical_activity"
                name="physical_activity"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.physical_activity}
                invalid={checkIfDefined(formik.errors.physical_activity, false) ? true : false}
                touched={checkIfDefined(formik.touched.physical_activity, false) ? true : false}
                errorMessage={formik.errors.physical_activity}
            />
            <Input
                label="If yes, please describe the type (e.g. gym, yoga, running, rock climbing) and hours per week."
                id="physical_activity_details"
                name="physical_activity_details"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.physical_activity_details}
                invalid={checkIfDefined(formik.errors.physical_activity_details, false) ? true : false}
                touched={checkIfDefined(formik.touched.physical_activity_details, false) ? true : false}
                errorMessage={formik.errors.physical_activity_details}
            />
            <Input
                label="You may have heard of “morning” and “evening” type people. Morning-types, or larks, are those people who love to wake-up early, often like to exercise and work in the morning, and go to sleep early. Evening-types or owls prefer to sleep in, are often most productive at night and rarely go to sleep before midnight. Which do you consider yourself to be?"
                id="type"
                name="type"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                invalid={checkIfDefined(formik.errors.type, false) ? true : false}
                touched={checkIfDefined(formik.touched.type, false) ? true : false}
                errorMessage={formik.errors.type}
            />
            <Input
                label="What time would be perfect for you to fall asleep at?"
                id="ideal_sleep_time"
                name="ideal_sleep_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.ideal_sleep_time}
                invalid={checkIfDefined(formik.errors.ideal_sleep_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.ideal_sleep_time, false) ? true : false}
                errorMessage={formik.errors.ideal_sleep_time}
            />
            <Input
                label="At what time would you feel best when waking up without using an alarm clock?"
                id="ideal_wake_time"
                name="ideal_wake_time"
                type="time"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.ideal_wake_time}
                invalid={checkIfDefined(formik.errors.ideal_wake_time, false) ? true : false}
                touched={checkIfDefined(formik.touched.ideal_wake_time, false) ? true : false}
                errorMessage={formik.errors.ideal_wake_time}
            />
        </form>
    )
}

export default LifestyleFactors