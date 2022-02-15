/**
 * File for converting questionnaire JSON data to correct format
*/

const { checkIfDefined, checkIfEmpty } = require('../shared/validation')
const time = require('../shared/date_time')
module.exports = {
    convert: function (rawData) {
        const quesionnaireData =
        {
            "general":
            {
                "timestamp": checkIfEmpty(rawData["Timestamp"]),
                "heard_from": checkIfEmpty(rawData["How did you hear about us?"])
            },
            "client_details":
            {
                "fullname": checkIfEmpty(rawData["Full name"]),
                "email": checkIfEmpty(checkIfDefined(rawData["Email address"], "")),
                "dob": checkIfEmpty(rawData["Date of birth"]),
                "age": checkIfEmpty(rawData["Age"]),
                "id_number": checkIfEmpty(rawData["ID number"]),
                "postal_address": checkIfEmpty(rawData["Postal address"]),
                "contact_number": checkIfEmpty(rawData["Contact phone number"]),
                "gender": checkIfEmpty(rawData["Please provide your gender"]),
                "height": checkIfEmpty(checkIfDefined(+rawData["Height (cm)"], undefined)),
                "weight": checkIfEmpty(checkIfDefined(+rawData["Weight (kg)"], undefined)),
                "waist_circumference": checkIfEmpty(checkIfDefined(+rawData["Waist circumference (cm)"], undefined)),
                "neck_circumference": checkIfEmpty(checkIfDefined(+rawData["Neck circumference (cm)"], undefined))
            },
            "sleep_history":
            {
                "primary_complaint": checkIfEmpty(rawData["Please describe your main sleep complaint"]),
                "conditions": checkIfEmpty(rawData["Have you previously been diagnosed with any of the following sleep-related conditions? Select all that apply."]),
                "additional_information": checkIfEmpty(rawData["Use this space if you would like to provide any additional information to the question above."]),
                "period": checkIfEmpty(rawData["\"How long have you had a problem with your sleep (specify weeks, months or years)?\""]),
                "problem_nights": checkIfEmpty(checkIfDefined(+rawData["\"During the past month, on how many nights each week have you had a problem with your sleep?\""], undefined)),
                "severity": checkIfEmpty(checkIfDefined(+rawData["\"On a scale of 1 to 10, how severe is your sleep problem is to you?\""], undefined)),
                "symptoms": {
                    "snore_loudly": rawData["\"Sleep-related symptoms [Do you snore loudly, or has your snoring bothered other people?]\""],
                    "family_snoring": rawData["Sleep-related symptoms [Do you have a family history of snoring?]"],
                    "stop_breathing": rawData["Sleep-related symptoms [Has anyone observed you stop breathing or choke/gasp during your sleep?]"],
                    "sleep_episodes": rawData["\"Sleep-related symptoms [Do you experience brief, uncontrollable episodes of sleep (known as a \"\"sleep attack\"\") during the day, even though you're getting enough sleep at night?]\""],
                    "muscle_tone": rawData["\"Sleep-related symptoms [Do you ever experience a sudden loss in muscle tone during the daytime (e.g. slurred speech, buckling knees or complete paralysis)?]\""],
                    "sleep_attacks": rawData["\"Sleep-related symptoms [Are your \"\"sleep attacks\"\" or sudden loss in muscle tone ever in response to a strong emotion like laughing or crying?]\""],
                    "sleep_paralysis": rawData["\"Sleep-related symptoms [Do you experience sleep paralysis (i.e. feel unable to move your muscles) at any time while falling asleep, during sleep, or when waking up?]\""],
                    "hallucinations": rawData["Sleep-related symptoms [Do you experience hallucinations just as you are falling asleep?]"],
                    "limb_sensation": rawData["Sleep-related symptoms [Do you feel an uncomfortable / crawling / itching / burning / creepy / hard to describe sensation in your limbs or an irresistible urge to move your limbs when you lie down to go to sleep?]"],
                    "limb_movement": rawData["\"Sleep-related symptoms [Do your limbs seem to feel better when you walk, stretch or make other movements?]\""],
                    "difficulty_sleeping": rawData["Sleep-related symptoms [Do you have difficulty falling asleep because of these sensations?]"],
                    "body_movements": rawData["\"Sleep-related symptoms [Has anyone told you that your body makes unusual, repetitive movements while you sleep?]\""],
                    "lower_legs": rawData["Sleep-related symptoms [Do these movements tend to occur in your lower legs?]"],
                    "wakeup_bathroom": rawData["Sleep-related symptoms [Do you usually wake up to use the bathroom more than twice during the night?]"],
                    "wakeup_indigestion": rawData["Sleep-related symptoms [Do you wake up during the night with indigestion or acid in your mouth?]"],
                    "sore_throat": rawData["Sleep-related symptoms [Do you often have a sore throat in the morning?]"],
                    "headache": rawData["Sleep-related symptoms [Do you often wake up with a headache in the morning?]"],
                    "dry_mouth": rawData["Sleep-related symptoms [Do you often have a dry mouth in the morning?]"],
                    "grind_teeth": rawData["Sleep-related symptoms [Do you usually grind or clench your teeth while you sleep?]"],
                    "jaw_discomfort": rawData["\"Sleep-related symptoms [Do you usually suffer from jaw discomfort, fatigue, or pain?]\""]
                },
                "sleep_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you usually go to sleep?"])),
                "to_sleep_duration": checkIfEmpty(checkIfDefined(+rawData["How long do you think it usually takes you to fall asleep at night (minutes)?"], undefined)),
                "wakeup_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you usually wake-up?"])),
                "sleep_duration": checkIfEmpty(checkIfDefined(+rawData["How much sleep do you think you usually get each night (hours)?"], undefined)),
                "sleep_quality": checkIfEmpty(checkIfDefined(+rawData["\"On a scale of 1 to 10, how would you rate the quality of your sleep?\""], undefined)),
                "restorative_rating": checkIfEmpty(checkIfDefined(+rawData["\"One a scale of 1 to 10, how restorative or refreshing do you think your sleep is?\""], undefined)),
                "napping_pattern": checkIfEmpty(rawData["What best describes your daytime napping patterns?"]),
                "nap_period": checkIfEmpty(rawData["\"If you nap, what time of day do you usually nap and for how long?\""]),
                "sleep_interferences": checkIfEmpty(rawData["Which of the following most often interferes with your sleep? Select all that apply."]),
                "last_month": checkIfEmpty(rawData["In the last month:"]),
                "alertness": checkIfEmpty(checkIfDefined(+rawData["How alert are you during the day time?"], undefined)),
            },
            "epworth_sleepiness_scale":
            {
                "sitting_reading": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Sitting and reading]"]),
                "watching_tv": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Watching TV]"]),
                "sitting_public": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Sitting inactive in a public place]"]),
                "passenger_car": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Being a passenger in a car for an hour]"]),
                "lying_down": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Lying down in the afternoon]"]),
                "sitting_talking": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Sitting and talking to someone]"]),
                "sitting_after_lunch": checkIfEmpty(rawData["How likely you are to doze or fall asleep when ...? [Sitting quietly after lunch (no alcohol)]"]),
                "driving_traffic": checkIfEmpty(rawData["\"How likely you are to doze or fall asleep when ...? [As the driver, stopping for a few minutes in traffic while driving]\""]),
            },
            "fatigue_severity_scale":
            {
                "low_motivation": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [My motivation is lower when I am fatigued]"], undefined)),
                "exercise": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [Exercise brings on my fatigue]"], undefined)),
                "easily_fatigued": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [I am easily fatigued]"], undefined)),
                "physical_functionality": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [Fatigue interferes with my physical functioning]"], undefined)),
                "frequent_problems": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [Fatigue cases frequent problems for me]"], undefined)),
                "sustained_physical": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [My fatigue prevents sustained physical functioning]"], undefined)),
                "duties_responsibilities": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [Fatigue interferes with carrying out certain duties and responsibilities]"], undefined)),
                "disabling_symptoms": checkIfEmpty(checkIfDefined(+rawData["To what extent do you agree that each statement below relates to you during the past week? [Fatigue is among my three most disabling symptoms]"], undefined)),
                "work_family_social": checkIfEmpty(checkIfDefined(+rawData["\"To what extent do you agree that each statement below relates to you during the past week? [Fatigue interferes with my work, family or social life]\""], undefined))
            },
            "insomnia_severity_index":
            {

                "falling_asleep": checkIfEmpty(rawData["Please rate the current severity of your insomnia problem(s) (i.e. last 2 weeks). [Difficulty falling asleep]"]),
                "staying_asleep": checkIfEmpty(rawData["Please rate the current severity of your insomnia problem(s) (i.e. last 2 weeks). [Difficulty staying asleep]"]),
                "waking_early": checkIfEmpty(rawData["Please rate the current severity of your insomnia problem(s) (i.e. last 2 weeks). [Problems waking up too early]"]),

                "sleep_satisfaction": checkIfEmpty(rawData["How satisfied/dissatisfied are you with your current sleep pattern?"]),
                "sleep_problem_noticeable": checkIfEmpty(rawData["How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?"]),
                "worried_distressed": checkIfEmpty(rawData["How worried/distressed are you about your current sleep problem?"]),
                "daily_functioning": checkIfEmpty(rawData["\"To what extent do you consider your sleep problem to interfere with your daily functioning (e.g. daytime fatigue, mood, ability to function at work/daily chores, concentration, memory, mood, etc.)?\""]),

            },
            "medical_history":
            {
                "medical_conditions": checkIfEmpty(rawData["Do you suffer from or have you been diagnosed with any medical or psychiatric condition(s) (current or past)?"] !== undefined ? rawData["Do you suffer from or have you been diagnosed with any medical or psychiatric condition(s) (current or past)?"] === "Yes" ? true : false : undefined),
                "name_date_diagnosed": checkIfEmpty(rawData["\"If yes, please provide the name of the condition(s) and date(s) diagnosed. \""]),
                "high_blood_pressure": checkIfEmpty(rawData["Do you have high blood pressure?"] !== undefined ? rawData["Do you have high blood pressure?"] === "Yes" ? true : false : undefined),
                "ladies_only": checkIfEmpty(rawData["Ladies only: Are you ..."]),
                "medication": checkIfEmpty(rawData["\"Do you take any medication prescribed by your doctor (e.g. for hypertension, anxiety)?\""] !== undefined ? rawData["\"Do you take any medication prescribed by your doctor (e.g. for hypertension, anxiety)?\""] === "Yes" ? true : false : undefined),
                "medication_details": checkIfEmpty(rawData["\"If yes, please list the name of the medication(s), purpose, dose, time of day taken, and years taken.\""]),
                "sleep_med": checkIfEmpty(rawData["Do you currently or have you in the past used any medication or supplement specifically to help you with sleep (prescribed or over-the-counter)?"] !== undefined ? rawData["Do you currently or have you in the past used any medication or supplement specifically to help you with sleep (prescribed or over-the-counter)?"] === "Yes" ? true : false : undefined),
                "sleep_med_details": checkIfEmpty(rawData["\"If yes, please list the name of the sleep aid, dose and years taken.\""]),
                "medicine_usage": checkIfEmpty(rawData["\"During the past month, how often have you taken medicine (prescribed or \"\"over the counter\"\") to help you sleep?\""])
            },
            "lifestyle_factors":
            {
                "children": checkIfEmpty(rawData["Do you have young children living with you?"] !== undefined ? rawData["Do you have young children living with you?"] === "Yes" ? true : false : undefined),
                "children_details": checkIfEmpty(rawData["\"If so, how old are they and do they impact on your sleep?\""]),
                "bed_partner": checkIfEmpty(rawData["Do you have a bed partner?"] !== undefined ? rawData["Do you have a bed partner?"] === "Yes" ? true : false : undefined),
                "partner_details": checkIfEmpty(rawData["\"If yes, is there anything about your be)d partner that challenges your sleep?\""]),
                "work_status": checkIfEmpty(rawData["What best describes your current work status?"]),
                "work_days": checkIfEmpty(checkIfDefined(+rawData["\"If you do work, how many days per week do you work?\""], undefined)),
                "work_hours": checkIfEmpty(checkIfDefined(+rawData["How many hours per week do you work?"], undefined)),
                "work_schedule": checkIfEmpty(rawData["What best describes your usual work schedule?"]),
                "start_work_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you usually start work?"])),
                "end_work_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you usually end work?"])),
                "leave_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you have to leave home in the morning to get work on time?"])),
                "home_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time do you get home from work in the afternoon / evening?"])),
                "selection": checkIfEmpty(rawData["Please select all that apply"]),
                "alcoholic_drinks": checkIfEmpty(rawData["\"How many drinks containing alcohol (e.g. 1 beer =250ml, 1 tot spirits=25ml, 1 small glass wine=125ml) do you usually have per week?\""]),
                "caffeine_drinks": checkIfEmpty(rawData["How many caffeine-containing drinks/products do you usually have per day?"]),
                "nicotine_products": checkIfEmpty(rawData["How many nicotine products do you usually have per day?"]),
                "recreation_drugs": checkIfEmpty(rawData["What recreational drugs do you use and how often (per week)?"]),
                "physical_activity": checkIfEmpty(rawData["Do you usually participate in regular physical activity?"] !== undefined ? rawData["Do you usually participate in regular physical activity?"] === "Yes" ? true : false : undefined),
                "physical_activity_details": checkIfEmpty(rawData["\"If yes, please describe the type (e.g. gym, yoga, running, rock climbing) and hours per week.\""]),
                "type": checkIfEmpty(rawData["\"You may have heard of “morning” and “evening” type people. Morning-types, or larks, are those people who love to wake-up early, often like to exercise and work in the morning, and go to sleep early. Evening-types or owls prefer to sleep in, are often most productive at night and rarely go to sleep before midnight. Which do you consider yourself to be?\""]),
                "ideal_sleep_time": checkIfEmpty(time.convertToTimeFormat(rawData["What time would be perfect for you to fall asleep at?"])),
                "ideal_wake_time": checkIfEmpty(time.convertToTimeFormat(rawData["At what time would you feel best when waking up without using an alarm clock? "]))
            }
        }

        return quesionnaireData;
    }
}
