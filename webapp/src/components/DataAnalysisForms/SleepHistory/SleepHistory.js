import React, { useState } from 'react'
import { checkIfDefined } from '../../../shared/Utility'
import AnalysisTable from '../../AnalysisTable/AnalysisTable'

const SleepHistory = (props) => {

    const sleep_history = checkIfDefined(props.sleep_history, {})
    const lifestyle_factors = checkIfDefined(props.lifestyle_factors, {})

    const [state, setState] = useState({
        primary_complaint: sleep_history.primary_complaint,
        problem_period: sleep_history.period,
        problem_nights: sleep_history.problem_nights,
        severity_rating: sleep_history.severity,
        chronotype: lifestyle_factors.type,
        sleep_time: sleep_history.sleep_time,
        waketime: sleep_history.wakeup_time,
        time_to_sleep: sleep_history.to_sleep_duration,
        sleep_duration: sleep_history.sleep_duration,
        sleep_quality: sleep_history.sleep_quality,
        nap_period: sleep_history.nap_period,
        napping_pattern: sleep_history.napping_pattern,
        diagnosed_conditions: sleep_history.conditions,
        additional_information: sleep_history.additional_information,
        sleep_related_symptoms: sleep_history.symptoms
    })

    return <AnalysisTable state={state} />
}
export default SleepHistory