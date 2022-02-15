import classes from './PreviousSaveButtons.module.css'
import React from 'react'

const PreviousSaveButtons = (props) => {
    return (
        <div className={classes.ButtonGroup}>
            {props.phase !== "questionnaire" && <button onClick={props.OnPrevious} className={classes.PrevButton}>PREVIOUS STEP</button>}
            <button
                onClick={props.OnSave}
                className={props.phase !== "questionnaire"
                    ? classes.SaveButton
                    : classes.SaveButton_questionnaire}
            >
                {props.phase !== "analysis" ? 'SAVE & CONTINUE' :  "GENERATE REPORT"}
            </button>
        </div>
    )
}

export default PreviousSaveButtons