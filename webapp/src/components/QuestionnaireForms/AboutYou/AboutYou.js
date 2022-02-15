import React, { useState } from 'react'
import classes from './AboutYou.module.css'
import { checkIfDefined } from '../../../shared/Utility'
import Input from '../../UI/Input/Input'

const AboutYou = (props) => {

    const handleChange = event => {
        formik.setFieldValue(event.target.name, event.target.value)
    }

    const formik = props.formik

    return (
        <form className={classes.Form}>
            <Input
                label="Full name"
                id="fullname"
                name="fullname"
                type="text"
                onChange={handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                invalid={checkIfDefined(formik.errors.fullname, false) ? true : false}
                touched={checkIfDefined(formik.touched.fullname, false) ? true : false}
                errorMessage={formik.errors.fullname}
            />
            <Input
                label="Email"
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                invalid={checkIfDefined(formik.errors.email, false) ? true : false}
                touched={checkIfDefined(formik.touched.email, false) ? true : false}
                errorMessage={formik.errors.email}
            />
            <div>
                <Input
                    label="Date of Birth"
                    id="dob"
                    name="dob"
                    type="text"
                    onChange={handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    // value={checkIfDefined(formik.values.dob, "").split("T")[0]}
                    value={checkIfDefined(formik.values.dob, "")}
                    invalid={checkIfDefined(formik.errors.dob, false) ? true : false}
                    touched={checkIfDefined(formik.touched.dob, false) ? true : false}
                    errorMessage={formik.errors.dob}
                />
                <Input
                    label={"Age"}
                    id="age"
                    name="age"
                    type="text"
                    onChange={handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    invalid={checkIfDefined(formik.errors.age, false) ? true : false}
                    touched={checkIfDefined(formik.touched.age, false) ? true : false}
                    errorMessage={formik.errors.age}
                />
            </div>
            <Input
                label={"ID number"}
                id="id_number"
                name="id_number"
                type="text"
                onChange={handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.id_number}
                invalid={checkIfDefined(formik.errors.id_number, false) ? true : false}
                touched={checkIfDefined(formik.touched.id_number, false) ? true : false}
                errorMessage={formik.errors.email}
            />
            <div>
                <Input
                    label={"Gender"}
                    id="male"
                    name="gender"
                    type="text"
                    onChange={handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    invalid={checkIfDefined(formik.errors.gender, false) ? true : false}
                    touched={checkIfDefined(formik.touched.gender, false) ? true : false}
                    errorMessage={formik.errors.gender}
                />
                <Input
                    label={"Contact number"}
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    onChange={handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact_number}
                    invalid={checkIfDefined(formik.errors.contact_number, false) ? true : false}
                    touched={checkIfDefined(formik.touched.contact_number, false) ? true : false}
                    errorMessage={formik.errors.contact_number}
                />
            </div>
            <Input
                label={"Postal address"}
                id="postal_address"
                name="postal_address"
                type="text"
                onChange={handleChange}
                isQuestionnaire={true}
                onBlur={formik.handleBlur}
                value={formik.values.postal_address}
                invalid={checkIfDefined(formik.errors.postal_address, false) ? true : false}
                touched={checkIfDefined(formik.touched.postal_address, false) ? true : false}
                errorMessage={formik.errors.postal_address}
            />
            <div>

                <Input
                    label={"Height (cm)"}
                    id="height"
                    name="height"
                    type="text"
                    onChange={handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.height}
                    invalid={checkIfDefined(formik.errors.height, false) ? true : false}
                    touched={checkIfDefined(formik.touched.height, false) ? true : false}
                    errorMessage={formik.errors.height}
                />
                <Input
                    label={"Weight (kg)"}
                    id="weight"
                    name="weight"
                    type="text"
                    onChange={handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                    invalid={checkIfDefined(formik.errors.weight, false) ? true : false}
                    touched={checkIfDefined(formik.touched.weight, false) ? true : false}
                    errorMessage={formik.errors.weight}
                />
            </div>

            <div>
                <Input
                    label={"Waist circumference (cm)"}
                    id="waist_circumference"
                    name="waist_circumference"
                    type="text"
                    onChange={handleChange}
                    styleContainer={classes.styleContainer}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.waist_circumference}
                    invalid={checkIfDefined(formik.errors.waist_circumference, false) ? true : false}
                    touched={checkIfDefined(formik.touched.waist_circumference, false) ? true : false}
                    errorMessage={formik.errors.waist_circumference}
                />
                <Input
                    label={"Neck circumference (cm)"}
                    id="neck_circumference"
                    name="neck_circumference"
                    type="text"
                    onChange={handleChange}
                    isQuestionnaire={true}
                    onBlur={formik.handleBlur}
                    value={formik.values.neck_circumference}
                    invalid={checkIfDefined(formik.errors.neck_circumference, false) ? true : false}
                    touched={checkIfDefined(formik.touched.neck_circumference, false) ? true : false}
                    errorMessage={formik.errors.neck_circumference}
                />
            </div>
        </form>
    )
}

export default AboutYou