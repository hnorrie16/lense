import React from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './SummaryAssessmentModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import Button from '../../Button/Button'

const SummaryAssessmentModal = (props) => {
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : classes.ModalHidden}>
                <div className={classes.Header}>
                    <h2>Assessment Summary</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /> {/* Modal closes on pressing the cross icon */}
                </div>
                <div className={classes.InnerModalContainer}>
                    <h4>This is a summary of the assessment</h4>
                    <div className={classes.ButtonGroup}>
                        <Button buttonType={"primary"} clicked = {props.close}>Close</Button>
                    </div>
                </div>
            </div>
        </Overlay>
    )
}

export default SummaryAssessmentModal