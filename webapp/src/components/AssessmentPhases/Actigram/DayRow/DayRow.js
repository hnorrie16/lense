import React, { useState } from 'react'
import classes from './DayRow.module.css'
import { checkIfDefined } from '../../../../shared/Utility'

const DayRow = (props) => {

    const data = checkIfDefined(props.data, {})

    const [values, setValues] = useState({
        sleep_medication: data.sleep_medication,
        sleep_satisfaction: data.sleep_satisfaction,
        sleep_restoration: data.sleep_restoration
    });

    const index = props.index

    const handleChange = (event, max) => {
        let val = +event.target.value

        if (max === 4 && (val === 0 || val === 1 || val === 2 || val === 3 || val === 4)) {
            setValues(prevValues => ({
                ...prevValues,
                [event.target.name]: event.target.value
            }))
        }

        if (max === 1 && (val === 0 || val === 1)) {
            setValues(prevValues => ({
                ...prevValues,
                [event.target.name]: event.target.value
            }))
        }

        if (isNaN(+event.target.value) === false && typeof (+event.target.value) === "number") {
            val = +event.target.value
        }
        console.log({[index]: { ...props.days[index], [event.target.name]: val }})
        props.setDays({ ...props.days, [index]: { ...props.days[index], [event.target.name]: val } }, props.lastKey)
    }

    return (
        <tr className={classes.Row}>
            <td className={classes.Day}>{props.day}</td>
            <td className={classes.Day}>
                <input
                    type="number"
                    id="sleep_medication"
                    name="sleep_medication"
                    onChange={(event) => handleChange(event, 1)}
                    value={values.sleep_medication}
                    min="0"
                    max="1"
                />
            </td>
            <td className={classes.Day}>
                <input
                    type="number"
                    id="sleep_satisfaction"
                    name="sleep_satisfaction"
                    onChange={(event) => handleChange(event, 4)}
                    value={values.sleep_satisfaction}
                    min="0"
                    max="4"
                />
            </td>
            <td className={classes.Day}>
                <input
                    type="number"
                    id="sleep_restoration"
                    name="sleep_restoration"
                    onChange={(event) => handleChange(event, 4)}
                    value={values.sleep_restoration}
                    min="0"
                    max="4"
                />
            </td>
        </tr>
    )
}

export default DayRow