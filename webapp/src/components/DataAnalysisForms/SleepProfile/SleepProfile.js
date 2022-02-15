import React, { useState } from 'react'
import { checkIfDefined } from '../../../shared/Utility'
import AnalysisTable from '../../AnalysisTable/AnalysisTable'

const SleepProfile = (props) => {
    const data = checkIfDefined(props.calculations.sleep_profile, {})

    const [state, setState] = useState({
        sleep_opportunity: checkIfDefined(checkIfDefined(data.sleep_opportunity, "").value, ""),
        bedtime_regularity: checkIfDefined(checkIfDefined(data.bedtime_regularity, "").value, ""),
        wakeup_regularity: checkIfDefined(checkIfDefined(data.wakeup_regularity, "").value, ""),
        timeinbed_regularity: checkIfDefined(checkIfDefined(data.timeinbed_regularity, "").value, ""),
        sleep_satisfaction: checkIfDefined(checkIfDefined(data.sleep_satisfaction, "").value, ""),
        sleep_restoration: checkIfDefined(checkIfDefined(data.sleep_restoration, "").value, ""),
        daytime_sleepiness: checkIfDefined(checkIfDefined(data.daytime_sleepiness, "").value, ""),
        daytime_fatigue: checkIfDefined(checkIfDefined(data.daytime_fatigue, "").value, ""),
        daytime_alertness: checkIfDefined(checkIfDefined(data.daytime_alertness, "").value, ""),
        daytime_dysfunction: checkIfDefined(checkIfDefined(data.daytime_dysfunction, "").value, ""),
        sleep_medication_use: checkIfDefined(checkIfDefined(data.sleepmed_use, "").value, ""),
        epworth_sleepiness_scale: checkIfDefined(checkIfDefined(props.calculations.sleep_questionnaires, "").ess, ""),
        fatigue_severity_scale: checkIfDefined(checkIfDefined(props.calculations.sleep_questionnaires, "").fss, ""),
        insomnia_severity_index: checkIfDefined(checkIfDefined(props.calculations.sleep_questionnaires, "").isi, "")
    })

    return <AnalysisTable state={state} />
}
export default SleepProfile