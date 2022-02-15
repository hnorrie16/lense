import React, {useState, useEffect} from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './ViewActigramModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'

const ViewActigramModal = (props) => {
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : classes.ModalHidden}>
                <div className={classes.Header}>
                    <h2>Upload Questionnaire Data</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /> {/* Modal closes on pressing the cross icon */}
                </div>
                <div className={classes.InnerModalContainer}>
                    <img src={`${props.image}?${new Date().getTime()}`} />
                    {/* <div className={classes.ButtonGroup}>
                        <Button buttonType={"primary"} clicked={props.close}>Close</Button>
                    </div> */}
                </div>
            </div>
        </Overlay>
    )
}

export default ViewActigramModal