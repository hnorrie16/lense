import React, { useState } from 'react'
import classes from './FatigueScale.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const FatigueScale = (props) => {

    const formik = props.formik

    return (
        <form className={classes.Form}>
            <div>
                <Input
                    label="My motivation is lower when I am fatigued"
                    id="low_motivation"
                    name="low_motivation"
                    type="text"
                    onChange={formik.handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.low_motivation}
                    invalid={checkIfDefined(formik.errors.low_motivation, false) ? true : false}
                    touched={checkIfDefined(formik.touched.low_motivation, false) ? true : false}
                    errorMessage={formik.errors.low_motivation}
                />
                <Input
                    label="Exercise brings on my fatigue"
                    id="exercise"
                    name="exercise"
                    type="text"
                    onChange={formik.handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.exercise}
                    invalid={checkIfDefined(formik.errors.exercise, false) ? true : false}
                    touched={checkIfDefined(formik.touched.exercise, false) ? true : false}
                    errorMessage={formik.errors.exercise}
                />
            </div>
            <div>
                <Input
                    label="I am easily fatigued"
                    id="easily_fatigued"
                    name="easily_fatigued"
                    type="text"
                    onChange={formik.handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.easily_fatigued}
                    invalid={checkIfDefined(formik.errors.easily_fatigued, false) ? true : false}
                    touched={checkIfDefined(formik.touched.easily_fatigued, false) ? true : false}
                    errorMessage={formik.errors.easily_fatigued}
                />
                <Input
                    label="Fatigue interferes with my physical functioning"
                    id="physical_functionality"
                    name="physical_functionality"
                    type="text"
                    onChange={formik.handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.physical_functionality}
                    invalid={checkIfDefined(formik.errors.physical_functionality, false) ? true : false}
                    touched={checkIfDefined(formik.touched.physical_functionality, false) ? true : false}
                    errorMessage={formik.errors.physical_functionality}
                />
            </div>
            <div>
                <Input
                    label="Fatigue cases frequent problems for me"
                    id="frequent_problems"
                    name="frequent_problems"
                    type="text"
                    onChange={formik.handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.frequent_problems}
                    invalid={checkIfDefined(formik.errors.frequent_problems, false) ? true : false}
                    touched={checkIfDefined(formik.touched.frequent_problems, false) ? true : false}
                    errorMessage={formik.errors.frequent_problems}
                />
                <Input
                    label="My fatigue prevents sustained physical functioning"
                    id="sustained_physical"
                    name="sustained_physical"
                    type="text"
                    onChange={formik.handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.sustained_physical}
                    invalid={checkIfDefined(formik.errors.sitting_reading, false) ? true : false}
                    touched={checkIfDefined(formik.touched.sitting_reading, false) ? true : false}
                    errorMessage={formik.errors.sustained_physical}
                />
            </div>

            <Input
                label="Fatigue interferes with carrying out certain duties and responsibilities"
                id="duties_responsibilities"
                name="duties_responsibilities"
                type="text"
                onChange={formik.handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.duties_responsibilities}
                invalid={checkIfDefined(formik.errors.duties_responsibilities, false) ? true : false}
                touched={checkIfDefined(formik.touched.duties_responsibilities, false) ? true : false}
                errorMessage={formik.errors.duties_responsibilities}
            />
            <div>
                <Input
                    label="Fatigue is among my three most disabling symptoms"
                    id="disabling_symptoms"
                    name="disabling_symptoms"
                    type="text"
                    onChange={formik.handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.disabling_symptoms}
                    invalid={checkIfDefined(formik.errors.disabling_symptoms, false) ? true : false}
                    touched={checkIfDefined(formik.touched.disabling_symptoms, false) ? true : false}
                    errorMessage={formik.errors.disabling_symptoms}
                />
                <Input
                    label="Fatigue interferes with my work, family or social life"
                    id="work_family_social"
                    name="work_family_social"
                    type="text"
                    onChange={formik.handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.work_family_social}
                    invalid={checkIfDefined(formik.errors.work_family_social, false) ? true : false}
                    touched={checkIfDefined(formik.touched.work_family_social, false) ? true : false}
                    errorMessage={formik.errors.work_family_social}
                />
            </div>

        </form>
    )
}

export default FatigueScale