/**
 * Computation of calculations for questionnaire and actigraphy phases
*/
const { checkIfDefined, checkIfObjDefined } = require('../shared/validation')
module.exports =
{
    //Computes calculations that use questionnaire data. Other calculations extracted from database
    computeQuestionnaireCalculations: function (assessmentData) {
        const BMI = checkIfDefined(assessmentData.questionnaire_phase.client_details, false) ? calculateBMI(assessmentData.questionnaire_phase.client_details) : 0

        // Calculations for the heat maps 
        const ESS = checkIfObjDefined(assessmentData.questionnaire_phase.epworth_sleepiness_scale, false) ? calculateESS(assessmentData.questionnaire_phase.epworth_sleepiness_scale) : 0
        const FSS = checkIfObjDefined(assessmentData.questionnaire_phase.fatigue_severity_scale, false) ? calculateFSS(assessmentData.questionnaire_phase.fatigue_severity_scale) : 0
        const ISI = checkIfObjDefined(assessmentData.questionnaire_phase.insomnia_severity_index, false) ? calculateISI(assessmentData.questionnaire_phase.insomnia_severity_index) : 0
        // Calculations for sleep profile
        // Results formatted as object like: {value: x, colour: y}
        const daytimeSleepiness = checkIfDefined(ESS, false) ? calculateDaytimeSleepiness(ESS) : {value: 0, colour: "None"}

        const daytimeFatigue = checkIfDefined(FSS, false) ? calculateDaytimeFatigue(FSS) : {value: 0, colour: "None"}
        const daytimeAlertness = checkIfDefined(assessmentData.questionnaire_phase.sleep_history.alertness, false) ? calculateDaytimeAlertness(assessmentData.questionnaire_phase.sleep_history.alertness) : {value: 0, colour: "None"}
        const daytimeDysfunction = checkIfDefined(assessmentData.questionnaire_phase.insomnia_severity_index.daily_functioning, false) ? calculateDaytimeDysfunction(assessmentData.questionnaire_phase.insomnia_severity_index.daily_functioning) : {value: 0, colour: "None"}
        const sleepSatisfaction = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? calculateSleepSatisfaction(assessmentData.actigraphy_phase.sleep_diary, assessmentData.questionnaire_phase.insomnia_severity_index.sleep_satisfaction) : {value: 0, colour: "None"}
        const sleepRestoration = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? calculateSleepRestoration(assessmentData.actigraphy_phase.sleep_diary, assessmentData.questionnaire_phase.sleep_history.restorative_rating) : {value: 0, colour: "None"}
        const sleepMedUse = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? calculateSleepMedicationUse(assessmentData.questionnaire_phase.medical_history, assessmentData.actigraphy_phase.sleep_diary) : {value: 0, colour: "None"}

        const bedtimeRegularity = checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_profile, {}).bedtime_regularity, {value: 0, colour: "None"})
        const wakeupRegularity = checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_profile, {}).wakeup_regularity, {value: 0, colour: "None"})
        const timeinbedRegularity = checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_profile, {}).timeinbed_regularity, {value: 0, colour: "None"})

        const sleepProfileObject = {
            daytime_sleepiness: daytimeSleepiness, daytime_fatigue: daytimeFatigue, daytime_alertness: daytimeAlertness, daytime_dysfunction: daytimeDysfunction,
            sleep_satisfaction: sleepSatisfaction, sleep_restoration: sleepRestoration, bedtime_regularity: bedtimeRegularity, wakeup_regularity: wakeupRegularity,
            timeinbed_regularity: timeinbedRegularity, sleepmed_use: sleepMedUse
        }

        const sleepOpportunity = checkIfDefined(assessmentData.actigraphy_phase.report.summary.average.time_in_bed, false) ? calculateSleepOpportunity(assessmentData.actigraphy_phase.report.summary, sleepProfileObject) : {value: 0, colour: "None"}

        // STOPBANG calculations
        const age = +assessmentData.questionnaire_phase.client_details.age
        const gender = assessmentData.questionnaire_phase.client_details.gender
        const neckCirc = +assessmentData.questionnaire_phase.client_details.neck_circumference
        const hypertensive = checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.questionnaire_phase, {}).medical_history, {}).high_blood_pressure, 0)

        const STOPBANG = checkIfDefined(assessmentData.questionnaire_phase.sleep_history, false) ? calculateStopBang(assessmentData.questionnaire_phase.sleep_history.symptoms, ESS, BMI, age, gender, neckCirc, hypertensive) : {}
        const calculationResult =
        {
            calculations: {
                bmi: BMI,
                sleep_questionnaires: {
                    ess: ESS,
                    fss: FSS,
                    isi: ISI
                },
                sleep_profile: { ...sleepProfileObject, sleep_opportunity: sleepOpportunity },
                stopbang: STOPBANG
            }
        }
        return calculationResult;

    },

    //Computes calculations that use actigraphy data. Other calculations extracted from database
    computeActigraphyCalculations: function (assessmentData) {
        const BMI = +checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).bmi, 0)

        // Calculations for the heat maps 
        const ESS = +checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_questionnaires, {}).ess, 0)
        const FSS = +checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_questionnaires, {}).fss, 0)
        const ISI = +checkIfDefined(checkIfDefined(checkIfDefined(checkIfDefined(assessmentData.analysis_phase, {}).calculations, {}).sleep_questionnaires, {}).isi, 0)

        // Calculations for sleep profile
        // Results formatted as object like: {value: x, colour: y}

        const daytimeSleepiness = checkIfDefined(assessmentData.analysis_phase.calculations.sleep_profile.daytime_sleepiness, false) ? assessmentData.analysis_phase.calculations.sleep_profile.daytime_sleepiness : {value: 0, colour: "None"}
        const daytimeFatigue = checkIfDefined(assessmentData.analysis_phase.calculations.sleep_profile.daytime_fatigue, false) ? assessmentData.analysis_phase.calculations.sleep_profile.daytime_fatigue : {value: 0, colour: "None"}
        const daytimeAlertness = checkIfDefined(assessmentData.analysis_phase.calculations.sleep_profile.daytime_alertness, false) ? assessmentData.analysis_phase.calculations.sleep_profile.daytime_alertness : {value: 0, colour: "None"}
        const daytimeDysfunction = checkIfDefined(assessmentData.analysis_phase.calculations.sleep_profile.daytime_dysfunction, false) ? assessmentData.analysis_phase.calculations.sleep_profile.daytime_dysfunction : {value: 0, colour: "None"}

        const sleepSatisfaction = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? checkIfDefined(assessmentData.questionnaire_phase.insomnia_severity_index.sleep_satisfaction, false) ? calculateSleepSatisfaction(assessmentData.actigraphy_phase.sleep_diary, assessmentData.questionnaire_phase.insomnia_severity_index.sleep_satisfaction) : {value: 0, colour: "None"} : {value: 0, colour: "None"}
        const sleepRestoration = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? checkIfDefined(assessmentData.questionnaire_phase.sleep_history.restorative_rating, false) ? calculateSleepRestoration(assessmentData.actigraphy_phase.sleep_diary, assessmentData.questionnaire_phase.sleep_history.restorative_rating) : {value: 0, colour: "None"} : {value: 0, colour: "None"}
        const bedtimeRegularity = checkIfDefined(assessmentData.actigraphy_phase.report.summary, false) ? calculateBedtimeRegularity(assessmentData.actigraphy_phase.report.summary) : {value: 0, colour: "None"}
        const wakeupRegularity = checkIfDefined(assessmentData.actigraphy_phase.report.summary, false) ? calculateWakeUpRegularity(assessmentData.actigraphy_phase.report.summary) : {value: 0, colour: "None"}
        const timeinbedRegularity = checkIfDefined(assessmentData.actigraphy_phase.report.summary, false) ? calculateTimeInBedRegularity(assessmentData.actigraphy_phase.report.summary) : {value: 0, colour: "None"}

        const sleepMedUse = checkIfDefined(assessmentData.actigraphy_phase.sleep_diary, false) ? checkIfDefined(assessmentData.questionnaire_phase.medical_history, false) ? calculateSleepMedicationUse(assessmentData.questionnaire_phase.medical_history, assessmentData.actigraphy_phase.sleep_diary) : {value: 0, colour: "None"} : {value: 0, colour: "None"}

        const sleepProfileObject = {
            daytime_sleepiness: daytimeSleepiness, daytime_fatigue: daytimeFatigue, daytime_alertness: daytimeAlertness, daytime_dysfunction: daytimeDysfunction,
            sleep_satisfaction: sleepSatisfaction, sleep_restoration: sleepRestoration, bedtime_regularity: bedtimeRegularity, wakeup_regularity: wakeupRegularity,
            timeinbed_regularity: timeinbedRegularity, sleepmed_use: sleepMedUse
        }

        const sleepOpportunity = checkIfDefined(assessmentData.actigraphy_phase.report.summary, false) ? calculateSleepOpportunity(assessmentData.actigraphy_phase.report.summary, sleepProfileObject) : {value: 0, colour: "None"}

        const STOPBANG = checkIfDefined(assessmentData.analysis_phase.calculations.stopbang, false) ? assessmentData.analysis_phase.calculations.stopbang : {}

        const calculationResult =
        {
            calculations: {
                bmi: BMI,
                sleep_questionnaires: {
                    ess: ESS,
                    fss: FSS,
                    isi: ISI
                },
                sleep_profile: { ...sleepProfileObject, sleep_opportunity: sleepOpportunity },
                stopbang: STOPBANG
            }
        }

        return calculationResult;

    }
}

/**
 * Calculation functions
*/

// Function to calculate BMI
const calculateBMI = (clientData) => {
    if (+clientData.height === 0) return 0
    return parseFloat(((clientData.weight) / (Math.pow(clientData.height / 100, 2))).toFixed(2))
}

// Function to calculate Epworth sleepiness scale
const calculateESS = (epworthData) => {
    let result = 0
    var objectKeysArray = Object.keys(epworthData)
    objectKeysArray.forEach(function (objKey) {
        if (epworthData[objKey] === "Would never doze or sleep") result += 0
        else if (epworthData[objKey] === "Slight chance of dozing or sleeping") result += 1
        else if (epworthData[objKey] === "Moderate chance of dozing or sleeping") result += 2
        else if (epworthData[objKey] === "High chance of dozing or sleeping") result += 3
        else result += 0
    })
    return result;
}


// Function to calculate Fatigue severity scale
const calculateFSS = (fatigueData) => {
    let total = 0
    let count = 0
    var objectKeysArray = Object.keys(fatigueData)
    objectKeysArray.forEach(function (objKey) {
        count += 1;
        total += +fatigueData[objKey]
    })
    return parseFloat((total / count).toFixed(2));
}

// Function to calculate Insomnia severity index
const calculateISI = (insomniaData) => {
    let result = 0
    var objectKeysArray = Object.keys(insomniaData)
    objectKeysArray.forEach(function (objKey) {
        const item = insomniaData[objKey];
        switch (item) {
            case "None":
                result += 0
                break;
            case "Mild":
                result += 1
                break;
            case "Moderate":
                result += 2
                break;
            case "Severe":
                result += 3
                break;
            case "Very severe":
                result += 4
                break;
            case "Very satisfied":
                result += 0
                break;
            case "Satisfied":
                result += 1
                break;
            case "Moderately satisfied":
                result += 2
                break;
            case "Dissatisfied":
                result += 3
                break;
            case "Very dissatisfied":
                result += 4
                break;
            case "A little":
                result += 1
                break;
            case "Somewhat":
                result += 2
                break;
            case "Much":
                result += 3
                break;
            case "Not at all noticeable":
                result += 0
                break;
            case "Very much noticeable":
                result += 4
                break;
            case "Not at all worried":
                result += 0
                break;
            case "Very much worried":
                result += 4
                break;
            case "Not at all interfering":
                result += 0
                break;
            case "Very much interfering":
                result += 4
                break;
            default:
                result += 0
                break
        }
    })
    return result;
}

// Function to calculate Daytime sleepiness level
const calculateDaytimeSleepiness = (ESS) => {
    let value = parseInt((((24 - ESS) / 24) * 10).toFixed(0));
    value = value === 0 ? 1 : value
    let colour = ""

    if (value >= 1 && value <= 3) colour = "Red"
    else if (value >= 4 && value <= 7) colour = "Amber"
    else if (value >= 8 && value <= 10) colour = "Green"
    else colour = "None"

    return { "value": value, "colour": colour }
}

// Function to calculate Daytime fatigue level
const calculateDaytimeFatigue = (FSS) => {
    let value = parseInt((((7 - FSS) / 7) * 10).toFixed(0))
    value = value === 0 ? 1 : value
    let colour = ""

    if (value < 3.5) colour = "Red"
    else if (value >= 3.5 && value < 7.5) colour = "Amber"
    else if (value >= 7.5) colour = "Green"
    else colour = "None"

    return { "value": value, "colour": colour }
}

// Function to determine colour
const determineColour = (value) => {
    if (value >= 1 && value <= 3) return "Red"
    else if (value >= 4 && value <= 7) return "Amber"
    else if (value >= 8 && value <= 10) return "Green"
    else return "None"
}

// Function to calculate Daytime alertness level
const calculateDaytimeAlertness = (alertness) => {
    let value = alertness === 0 ? 1 : alertness
    let colour = determineColour(value)
    return { "value": value, "colour": colour }
}

// Function to calculate Daytime dysfunction level
const calculateDaytimeDysfunction = (sleepInterference) => {
    let score = 0
    if (sleepInterference === "Not at all interfering") score = 0
    else if (sleepInterference === "A little") score = 1
    else if (sleepInterference === "Somewhat") score = 2
    else if (sleepInterference === "Much") score = 3
    else if (sleepInterference === "Very much interfering") score = 4

    let value = parseInt((((4 - score) / 4) * 10).toFixed(0))
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

// Function to calculate Sleep satisfaction level
const calculateSleepSatisfaction = (sleepDiaryData, satisfactionLevel) => {
    let total = 0
    let count = 0
    var objectKeysArray = Object.keys(checkIfDefined(sleepDiaryData, {}))
    objectKeysArray.forEach((objKey) => {
        count += 1
        total += +sleepDiaryData[objKey].sleep_satisfaction
    })
    if (satisfactionLevel === "Very satisfied") { total += 0; count += 1 }
    else if (satisfactionLevel === "Satisfied") { total += 1; count += 1 }
    else if (satisfactionLevel === "Moderately satisfied") { total += 2; count += 1 }
    else if (satisfactionLevel === "Dissatisfied") { total += 3; count += 1 }
    else if (satisfactionLevel === "Very dissatisfied") { total += 4; count += 1 }

    let value = parseInt(((total / count) * 2).toFixed(0));
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

// Function to calculate Sleep restoration level
const calculateSleepRestoration = (sleepDiaryData, restorativeRating) => {
    let total = 0
    let count = 0
    let sleepDiary = checkIfDefined(sleepDiaryData, {})
    var objectKeysArray = Object.keys(sleepDiary)
    objectKeysArray.forEach((objKey) => {
        count += 1
        total += +sleepDiary[objKey].sleep_restoration
    })

    total += restorativeRating
    count += 1


    let value = parseInt(((total / count) * 2).toFixed(0));
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

//Function to determine regularity from range 
const determineRegularity = (range) => {
    let regularity = 0
    switch (true) {
        case (range <= 0.5):
            regularity = 10
            break;
        case (range > 0.5 && range <= 1):
            regularity = 9
            break;
        case (range > 1 && range <= 1.5):
            regularity = 8
            break;
        case (range > 1.5 && range <= 2):
            regularity = 7
            break;
        case (range > 2 && range <= 2.5):
            regularity = 6
            break;
        case (range > 2.5 && range <= 3):
            regularity = 5
            break;
        case (range > 3 && range <= 3.5):
            regularity = 4
            break;
        case (range > 4 && range <= 4.5):
            regularity = 2
            break;
        case (range > 4.5 && range <= 5):
            regularity = 1
            break;
        default:
            regularity = 1
            break
    }

    return regularity
}

// Converts time string to decimal number
const timeStringToFloat = (time) => {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

//Function to calculate Bedtime regularity
const calculateBedtimeRegularity = (summaryData) => {
    const range = timeStringToFloat(summaryData.maximum.bedtime) - timeStringToFloat(summaryData.minimum.bedtime)

    let value = determineRegularity(parseFloat(range.toFixed(2)))
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

//Function to calculate Wake up regularity
const calculateWakeUpRegularity = (summaryData) => {
    const range = timeStringToFloat(summaryData.maximum.wakeup_time) - timeStringToFloat(summaryData.minimum.wakeup_time)

    let value = determineRegularity(parseFloat(range.toFixed(2)))
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

//Function to calculate Time in bed regularity
const calculateTimeInBedRegularity = (summaryData) => {
    const range = timeStringToFloat(summaryData.maximum.time_in_bed) - timeStringToFloat(summaryData.minimum.time_in_bed)

    let value = determineRegularity(parseFloat(range.toFixed(2)))
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

// Function to calculate sleep medication use
const calculateSleepMedicationUse = (sleepMedData, sleepDiaryData) => {
    let score = 0
    const sleepMed = sleepMedData.sleep_med
    const medUsage = sleepMedData.medicine_usage

    if (sleepMed == false) score = 10
    else {
        if (medUsage === "Not in the past 6 months") score = 9
        else if (medUsage === "Not during the past month") score = 8
        else {
            let sleepMedCount = 0
            var objectKeysArray = Object.keys(checkIfDefined(sleepDiaryData, {}))
            objectKeysArray.forEach((objKey) => {
                if (+sleepDiaryData[objKey].sleep_medication === 1) {
                    sleepMedCount += 1
                }
            })

            switch (sleepMedCount) {
                case 1:
                    score = 7;
                    break;
                case 2:
                    score = 6;
                    break;
                case 3:
                    score = 5;
                    break;
                case 4:
                    score = 4;
                    break;
                case 5:
                    score = 3;
                    break;
                case 6:
                    score = 2;
                    break;
                case 7:
                    score = 1;
                    break;
                default:
                    score = 1;
                    break
            }
        }
    }

    let value = score
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }
}

// Function to calculate Sleep opportunity
const calculateSleepOpportunity = (summaryData, sleepProfile) => {
    const timeinbedAverage = +(timeStringToFloat(summaryData.average.time_in_bed)).toFixed(3)
    let score = 0
    if (timeinbedAverage < 5 || timeinbedAverage > 11) score = 1
    else if ((timeinbedAverage >= 5 && timeinbedAverage <= 5.49) || (timeinbedAverage >= 10.51 && timeinbedAverage <= 11)) score = 2
    else if ((timeinbedAverage >= 5.5 && timeinbedAverage <= 5.99) || (timeinbedAverage >= 10.01 && timeinbedAverage <= 10.5)) score = 3
    else if ((timeinbedAverage >= 6 && timeinbedAverage <= 6.249) || (timeinbedAverage >= 9.751 && timeinbedAverage <= 10)) score = 4
    else if ((timeinbedAverage >= 6.25 && timeinbedAverage <= 6.49) || (timeinbedAverage >= 9.51 && timeinbedAverage <= 9.75)) score = 5
    else if ((timeinbedAverage >= 6.5 && timeinbedAverage <= 6.749) || (timeinbedAverage >= 9.251 && timeinbedAverage <= 9.5)) score = 6
    else if ((timeinbedAverage >= 6.75 && timeinbedAverage <= 6.99) || (timeinbedAverage >= 9.01 && timeinbedAverage <= 9.25)) score = 7
    else {
        //If average is from 7-9
        let amberCount = 0
        let greenCount = 0
        for (var key in sleepProfile) {
            if (sleepProfile[key].colour === "Amber") {
                amberCount += 1
                if (amberCount > 1) break
            }
            if (sleepProfile[key].colour === "Green") greenCount += 1
        }

        if (amberCount > 1) score = 8
        else if (amberCount === 1) score = 9
        else if (greenCount === 10) score = 10
    }

    let value = score
    value = value === 0 ? 1 : value
    let colour = determineColour(value)

    return { "value": value, "colour": colour }

}

// Function to calculate STOPBANG
const calculateStopBang = (symptoms, ESS, BMI, age, gender, neckCirc, hypertensive) => {
    const S = checkIfDefined(symptoms, {}).snore_loudly === "Yes" ? 1 : 0
    const T = ESS >= 10 ? 1 : 0
    const O = checkIfDefined(symptoms, {}).stop_breathing === "Yes" ? 1 : 0
    const P = hypertensive ? 1 : 0
    const B = BMI > 35 ? 1 : 0
    const A = age > 50 ? 1 : 0
    const N = !(gender.toLowerCase().includes("f")) ? neckCirc > 43 ? 1 : 0 : neckCirc > 41 ? 1 : 0
    const G = !(gender.toLowerCase().includes("f")) ? 1 : 0
    const STOPBANG =
    {
        "S": S,
        "T": T,
        "O": O,
        "P": P,
        "B": B,
        "A": A,
        "N": N,
        "G": G
    }

    let stopScore = 0
    let totalScore = 0

    for (var key in STOPBANG) {
        if (key === "S" || key === "T" || key === "O" || key === "P") {
            if (STOPBANG[key] === 1) {
                stopScore += 1
                totalScore += 1
            }
        }
        else {
            if (STOPBANG[key] === 1) totalScore += 1

        }
    }
    let risk = ""

    if (stopScore === 2 && (STOPBANG["G"] === 1 || STOPBANG["B"] === 1 || STOPBANG["N"] === 1)) risk = "High risk"
    else {
        if (totalScore >= 0 && totalScore <= 2) risk = "Low risk"
        else if (totalScore >= 3 && totalScore <= 4) risk = "Intermediate risk"
        else if (totalScore >= 5 && totalScore <= 8) risk = "High risk"
    }

    return { "values": STOPBANG, "risk": risk }
}