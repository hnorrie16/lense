module.exports = mongoose => {
    var assessmentSchema = mongoose.Schema(
        {
            date: {
                type: Date,
                required: true
            },
            status: {
                type: Number,
                required: true
            },
            questionnaire_phase: {
                general: {
                    type: Object
                    // timestamp: { type: String },
                    // heard_from: { type: String }
                },
                client_details: {
                    type: Object
                    // fullname: { type: String },
                    // email: { type: String },
                    // dob: { type: String },
                    // age: { type: Number },
                    // id_number: { type: String },
                    // postal_address: { type: String },
                    // contact_number: { type: String },
                    // gender: { type: String },
                    // height: { type: Number },
                    // weight: { type: Number },
                    // waist_circumference: { type: Number },
                    // neck_circumference: { type: Number }
                },
                sleep_history: {
                    type: Object
                    // primary_complaint: { type: String },
                    // conditions: { type: String },
                    // additional_information: { type: String },
                    // period: { type: String },
                    // problem_nights: { type: Number },
                    // severity: { type: Number },
                    // symptoms: {
                    //     snore_loudly: { type: String },
                    //     family_snoring: { type: String },
                    //     stop_breathing: { type: String },
                    //     sleep_episodes: { type: String },
                    //     muscle_tone: { type: String },
                    //     sleep_attacks: { type: String },
                    //     sleep_paralysis: { type: String },
                    //     hallucinations: { type: String },
                    //     limb_sensation: { type: String },
                    //     limb_movement: { type: String },
                    //     difficulty_sleeping: { type: String },
                    //     body_movements: { type: String },
                    //     lower_legs: { type: String },
                    //     wakeup_bathroom: { type: String },
                    //     wakeup_indigestion: { type: String },
                    //     sore_throat: { type: String },
                    //     headache: { type: String },
                    //     dry_mouth: { type: String },
                    //     grind_teeth: { type: String },
                    //     jaw_discomfort: { type: String }
                    // },
                    // sleep_time: { type: String },
                    // to_sleep_duration: { type: Number },
                    // wakeup_time: { type: String },
                    // sleep_duration: { type: Number },
                    // sleep_quality: { type: Number },
                    // restorative_rating: { type: Number },
                    // napping_pattern: { type: String },
                    // nap_period: { type: String },
                    // sleep_interferences: { type: String },
                    // last_month: { type: String },
                    // alertness: { type: Number }
                },
                epworth_sleepiness_scale:
                {
                    type: Object
                    // sitting_reading: { type: String },
                    // watching_tv: { type: String },
                    // sitting_public: { type: String },
                    // passenger_car: { type: String },
                    // lying_down: { type: String },
                    // sitting_talking: { type: String },
                    // sitting_after_lunch: { type: String },
                    // driving_traffic: { type: String }
                },
                fatigue_severity_scale:
                {
                    type: Object
                    // low_motivation: { type: Number },
                    // exercise: { type: Number },
                    // easily_fatigued: { type: Number },
                    // physical_functionality: { type: Number },
                    // frequent_problems: { type: Number },
                    // sustained_physical: { type: Number },
                    // duties_responsibilities: { type: Number },
                    // disabling_symptoms: { type: Number },
                    // work_family_social: { type: Number }
                },
                insomnia_severity_index:
                {
                    type: Object
                    // falling_asleep: { type: String },
                    // staying_asleep: { type: String },
                    // waking_early: { type: String },

                    // sleep_satisfaction: { type: String },
                    // sleep_problem_noticeable: { type: String },
                    // worried_distressed: { type: String },
                    // daily_functioning: { type: String }
                },
                medical_history: {
                    type: Object
                    // medical_conditions: { type: Boolean },
                    // name_date_diagnosed: { type: String },
                    // high_blood_pressure: { type: String },
                    // ladies_only: { type: String },
                    // medication: { type: Boolean },
                    // medication_details: { type: String },
                    // sleep_med: { type: Boolean },
                    // sleep_med_details: { type: String },
                    // medicine_usage: { type: String }
                },
                lifestyle_factors: {
                    type: Object
                    // children: { type: Boolean },
                    // children_details: { type: String },
                    // bed_partner: { type: Boolean },
                    // partner_details: { type: String },
                    // work_status: { type: String },
                    // work_days: { type: Number },
                    // work_hours: { type: Number },
                    // work_schedule: { type: String },
                    // start_work_time: { type: String },
                    // end_work_time: { type: String },
                    // leave_time: { type: String },
                    // home_time: { type: String },
                    // selection: { type: String },
                    // alcoholic_drinks: { type: String },
                    // caffeine_drinks: { type: String },
                    // nicotine_products: { type: String },
                    // recreation_drugs: { type: String },
                    // physical_activity: { type: Boolean },
                    // physical_activity_details: { type: String },
                    // type: { type: String },
                    // ideal_sleep_time: { type: String },
                    // ideal_wake_time: { type: String }
                }
            },
            consult_phase: {
                notes: { type: Object }
            },
            actigraphy_phase: {
                report: {
                    file_name: { type: String },
                    summary: {
                        minimum: {
                            bedtime: { type: String },
                            wakeup_time: { type: String },
                            time_in_bed: { type: String },
                            sleep_time: { type: String },
                            onset_latency: { type: Number },
                            sleep_efficiency: { type: Number },
                            waso: { type: Number },
                            no_arousals: { type: Number },
                            arousal_index: { type: Number }
                        },
                        maximum: {
                            bedtime: { type: String },
                            wakeup_time: { type: String },
                            time_in_bed: { type: String },
                            sleep_time: { type: String },
                            onset_latency: { type: Number },
                            sleep_efficiency: { type: Number },
                            waso: { type: Number },
                            no_arousals: { type: Number },
                            arousal_index: { type: Number }
                        },
                        average: {
                            bedtime: { type: String },
                            wakeup_time: { type: String },
                            time_in_bed: { type: String },
                            sleep_time: { type: String },
                            onset_latency: { type: Number },
                            sleep_efficiency: { type: Number },
                            waso: { type: Number },
                            no_arousals: { type: Number },
                            arousal_index: { type: Number }
                        }
                    },
                    daily: { type: Object },
                    summary_raw: {
                        columns: { type: Object },
                        data: { type: Object }
                    },
                    daily_raw: {
                        columns: { type: Object },
                        data: { type: Object }
                    }
                },
                sleep_diary: { type: Object }
            },
            analysis_phase: {
                calculations: {
                    bmi: { type: Number },
                    sleep_questionnaires: {
                        ess: { type: Number },
                        fss: { type: Number },
                        isi: { type: Number }
                    },
                    sleep_profile: {
                        daytime_sleepiness: { type: Object },
                        daytime_fatigue: { type: Object },
                        daytime_alertness: { type: Object },
                        daytime_dysfunction: { type: Object },
                        sleep_satisfaction: { type: Object },
                        sleep_restoration: { type: Object },
                        bedtime_regularity: { type: Object },
                        wakeup_regularity: { type: Object },
                        timeinbed_regularity: { type: Object },
                        sleepmed_use: { type: Object },
                        sleep_opportunity: { type: Object }
                    },
                    stopbang: {
                        values:
                        {
                            S: { type: String },
                            T: { type: String },
                            O: { type: String },
                            P: { type: String },
                            B: { type: String },
                            A: { type: String },
                            N: { type: String },
                            G: { type: String }
                        },
                        risk: { type: String }
                    }
                },
                interpretation: {
                    primary_complaint: { type: String },
                    medical_history: { type: String },
                    current_medication: { type: String },
                    risk_disorders: { type: String },
                    sleep_assessment: { type: String },
                    way_forward: { type: String }
                }
            },
            files: {
                actigram: {
                    file: { type: String },
                    key: { type: String },
                    file_name: { type: String }
                },
                consult_notes: {
                    file: { type: String },
                    key: { type: String },
                    file_name: { type: String }
                },
                final_report: {
                    file: { type: String },
                    key: { type: String }
                }
            }
        },
        { timestamps: true }
    );

    //converts _id object to id
    assessmentSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Assessment = mongoose.model("assessments", assessmentSchema);
    return Assessment;
};
