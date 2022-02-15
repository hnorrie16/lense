import React from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './ConfirmModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'

const ConfirmModal = props => {
    //Uses the Overlay component as a backdrop. The modal closes when you press the overlay
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : [classes.ModalVisible, classes.HideModal].join(' ')}>
                {!props.removeHeading && <div className={classes.Header}>
                    <h2>{!props.heading ? "Confirmation" : props.heading}</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /> {/* Modal closes on pressing the cross icon */}
                </div>}
                <div className={classes.InnerModalContainer}>
                    {props.children}
                </div>
            </div>
        </Overlay>
    )
};

export default ConfirmModal;

