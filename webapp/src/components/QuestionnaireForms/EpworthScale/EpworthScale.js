import React, { useState } from 'react'
import classes from './EpworthScale.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const EpworthScale = (props) => {

    const formik = props.formik
    return (
        <form className={classes.Form}>
            <Input
                label="Sitting and reading"
                id="sitting_reading"
                name="sitting_reading"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sitting_reading}
                invalid={checkIfDefined(formik.errors.sitting_reading, false) ? true : false}
                touched={checkIfDefined(formik.touched.sitting_reading, false) ? true : false}
                errorMessage={formik.errors.sitting_reading}
            />
            <Input
                label="Watching TV"
                id="watching_tv"
                name="watching_tv"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.watching_tv}
                invalid={checkIfDefined(formik.errors.watching_tv, false) ? true : false}
                touched={checkIfDefined(formik.touched.watching_tv, false) ? true : false}
                errorMessage={formik.errors.watching_tv}
            />
            <Input
                label="Sitting inactive in a public place"
                id="sitting_public"
                name="sitting_public"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sitting_public}
                invalid={checkIfDefined(formik.errors.sitting_public, false) ? true : false}
                touched={checkIfDefined(formik.touched.sitting_public, false) ? true : false}
                errorMessage={formik.errors.sitting_public}
            />
            <Input
                label="Being a passenger in a car for an hour"
                id="passenger_car"
                name="passenger_car"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.passenger_car}
                invalid={checkIfDefined(formik.errors.passenger_car, false) ? true : false}
                touched={checkIfDefined(formik.touched.passenger_car, false) ? true : false}
                errorMessage={formik.errors.passenger_car}
            />
            <Input
                label="Lying down in the afternoon"
                id="lying_down"
                name="lying_down"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.lying_down}
                invalid={checkIfDefined(formik.errors.lying_down, false) ? true : false}
                touched={checkIfDefined(formik.touched.lying_down, false) ? true : false}
                errorMessage={formik.errors.lying_down}
            />
            <Input
                label="Sitting and talking to someone"
                id="sitting_talking"
                name="sitting_talking"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sitting_talking}
                invalid={checkIfDefined(formik.errors.sitting_talking, false) ? true : false}
                touched={checkIfDefined(formik.touched.sitting_talking, false) ? true : false}
                errorMessage={formik.errors.sitting_talking}
            />
            <Input
                label="Sitting quietly after lunch (no alcohol)"
                id="sitting_after_lunch"
                name="sitting_after_lunch"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.sitting_after_lunch}
                invalid={checkIfDefined(formik.errors.sitting_after_lunch, false) ? true : false}
                touched={checkIfDefined(formik.touched.sitting_after_lunch, false) ? true : false}
                errorMessage={formik.errors.sitting_after_lunch}
            />
            <Input
                label="As the driver, stopping for a few minutes in traffic while driving"
                id="driving_traffic"
                name="driving_traffic"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.driving_traffic}
                invalid={checkIfDefined(formik.errors.driving_traffic, false) ? true : false}
                touched={checkIfDefined(formik.touched.driving_traffic, false) ? true : false}
                errorMessage={formik.errors.driving_traffic}
            />
        </form>
    )
}

export default EpworthScale