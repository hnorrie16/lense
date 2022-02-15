import React from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './ViewSummaryReportModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import Button from '../../Button/Button'
import DataTable from 'react-data-table-component';
import { checkIfDefined } from '../../../../shared/Utility'

const ViewSummaryReportModal = (props) => {
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : classes.ModalHidden}>
                <div className={classes.Header}>
                    <h2>Upload Questionnaire Data</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /> {/* Modal closes on pressing the cross icon */}
                </div>
                <div className={classes.InnerModalContainer}>
                    <DataTable
                        columns={checkIfDefined(checkIfDefined(props.report.summary_raw, {}).columns, [])}
                        data={checkIfDefined(checkIfDefined(props.report.summary_raw, {}).data, [])}
                    />
                    <DataTable
                        columns={checkIfDefined(checkIfDefined(props.report.daily_raw, {}).columns, [])}
                        data={checkIfDefined(checkIfDefined(props.report.daily_raw, {}).data, [])}
                    />
                    <div className={classes.ButtonGroup}>
                        <Button buttonType={"primary"} clicked={props.close}>Close</Button>
                    </div>
                </div>
            </div>
        </Overlay>
    )
}

export default ViewSummaryReportModal