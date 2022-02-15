import React from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './ValidationErrorModal.module.css'
import ErrorIcon from '../../../../Assets/Icons/error.svg'
import Button from '../../Button/Button'
const ValidationErrorModal = props => {
    //Uses the Overlay component as a backdrop. The modal closes when you press the overlay
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : classes.ModalHidden}>
                <div className={classes.InnerModalContainer}>
                    <div className={classes.ImageContainer_error}>
                        <img src={ErrorIcon} alt="error icon" />
                        <p> Validation failure!<br />Please go back and change the input as suggested. </p>
                    </div>
                    <div className={classes.ButtonGroup}>
                        <Button buttonType={"primary"} clicked={props.close}>Close</Button>
                    </div>
                </div>
            </div>
        </Overlay>
    )
};

export default ValidationErrorModal;

