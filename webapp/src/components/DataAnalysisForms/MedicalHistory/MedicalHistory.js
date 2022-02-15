import React, { useState } from 'react'
import { checkIfDefined } from '../../../shared/Utility'
import AnalysisTable from '../../AnalysisTable/AnalysisTable'

const MedicalHistory = (props) => {

    const data = checkIfDefined(props.medical_history, {})

    const [state, setState] = useState({
        medical_conditions: data.medical_conditions ? "Yes" : "No",
        name_date_diagnosed: data.name_date_diagnosed,
        ladies_only: data.ladies_only,
        high_blood_pressure: data.high_blood_pressure,
        medication: data.medication ? "Yes" : "No",
        medication_details: data.medication_details,
        sleep_med: data.sleep_med ? "Yes" : "No",
        sleep_med_details: data.sleep_med_details,
        medicine_usage: data.medicine_usage
    })

    return <AnalysisTable state={state} />
}
export default MedicalHistory