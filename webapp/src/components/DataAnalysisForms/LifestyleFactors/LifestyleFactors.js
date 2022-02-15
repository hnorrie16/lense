import React, { useState } from 'react'
import { checkIfDefined } from '../../../shared/Utility'
import AnalysisTable from '../../AnalysisTable/AnalysisTable'
const LifestyleFactors = (props) => {

    const data = checkIfDefined(props.lifestyle_factors, {})

    const [state, setState] = useState({
        children: data.children ? "Yes" : "No",
        bed_partner: data.bed_partner ? "Yes" : "No",
        work_status: data.work_status,
        work_days: data.work_days,
        work_hours: data.work_hours,
        work_schedule: data.work_schedule,
        start_work_time: data.start_work_time,
        end_work_time: data.end_work_time,
        leave_time: data.leave_time,
        home_time: data.home_time,
        selection: data.selection,
        alcoholic_drinks: data.alcoholic_drinks,
        caffeine_drinks: data.caffeine_drinks,
        nicotine_products: data.nicotine_products,
        recreation_drugs: data.recreation_drugs,
        physical_activity: data.physical_activity ? "Yes" : "No",
        physical_activity_details: data.physical_activity_details,
        type: data.type,
        ideal_sleep_time: data.ideal_sleep_time,
        ideal_wake_time: data.ideal_wake_time
    })

    return <AnalysisTable state={state} />
}
export default LifestyleFactors