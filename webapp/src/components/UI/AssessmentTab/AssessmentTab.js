import React from 'react'
import classes from './AssessmentTab.module.css'
import PropTypes from 'prop-types'

const AssessmentTab = (props) => {

    let containerStyle = classes.Container
    let cirlceStyle = classes.Circle
    if (props.isComplete && !props.isSelected) { // complete but not selected
        containerStyle = [classes.Container, classes.ContainerComplete].join(" ")
        cirlceStyle = [classes.Circle, classes.CircleComplete].join(" ")

    } else if (props.isComplete && props.isSelected) { // complete and selected
        containerStyle = [classes.Container, classes.ContainerComplete, classes.ContainerSelected].join(" ")
        cirlceStyle = [classes.Circle, classes.CircleComplete, classes.CircleSelected].join(" ")

    } else if (!props.isComplete && props.isSelected) { // incomplete and selected
        cirlceStyle = [classes.Circle, classes.CircleSelected].join(" ")
        containerStyle = [classes.Container, classes.ContainerSelected].join(" ")

    } else { // incomplete and not selected
        if (props.status < props.phase_number) {
            containerStyle = [classes.Container, classes.Disabled].join(" ")
            cirlceStyle = classes.Circle
        } else {
            containerStyle = classes.Container
            cirlceStyle = classes.Circle
        }
    }

    const onClickHandler = () => { if (props.status >= props.phase_number) props.OnSetCurrentTab(props.phase_number) }

    return (
        <div className={containerStyle} onClick={onClickHandler}>
            <div className={cirlceStyle}>
                {props.isComplete
                    ? <span className={classes.checkmark}>
                        <div className={classes.checkmark_stem}></div>
                        <div className={classes.checkmark_kick}></div>
                    </span>
                    : <span className={classes.PhaseNumber}>{props.phase_number}</span>}
            </div>
            <h3 className={!props.isSelected ? props.isComplete ? classes.TitleComplete : classes.Title : props.isComplete ? classes.TitleSelectedComplete : classes.TitleSelected}>{props.title}</h3>
        </div >
    )
}

AssessmentTab.propTypes = {
    isComplete: PropTypes.bool,
    isSelected: PropTypes.bool,
    tabNumber: PropTypes.number,
    title: PropTypes.string
}
export default AssessmentTab