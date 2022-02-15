import React from 'react'
import classes from './AnalysisTable.module.css'
const AnalysisTable = (props) => {

    const formatKeys = (key) => {
        let temp = key.replace(/_/g, " ").toLowerCase()
        return temp.charAt(0).toUpperCase() + temp.slice(1) + ":";
    }

    const rows = Object.keys(props.state).map(key => (
        <tr key={key} className={classes.Row}>
            <td className={classes.DataHeadings}>{formatKeys(key)}</td>
            <td className={classes.Data}>{props.state[key]}</td>
        </tr>
    ))

    return (
        <table className={classes.Table}>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default AnalysisTable