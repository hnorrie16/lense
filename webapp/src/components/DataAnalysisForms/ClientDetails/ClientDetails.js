import React, { useState } from 'react'
import { checkIfDefined } from '../../../shared/Utility'
import AnalysisTable from '../../AnalysisTable/AnalysisTable'

const ClientDetails = (props) => {
    const data = checkIfDefined(props.client_details, {})
    const bmi = checkIfDefined(props.bmi, 0)
    const [state, setState] = useState({
        fullname: data.fullname,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        BMI: bmi,
        waist_circumference: data.waist_circumference,
        neck_circumference: data.neck_circumference
    })

    return <AnalysisTable state={state} />
}
export default ClientDetails