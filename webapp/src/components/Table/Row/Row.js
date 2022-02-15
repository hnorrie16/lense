import React, { useState } from 'react'
import classes from './Row.module.css'
import OutsideAlerter from '../../OutsideAlerter/OutsideAlerter'
import { Link } from 'react-router-dom'
import { checkIfDefined } from '../../../shared/Utility'

const Row = (props) => {

    const [showDropDown, setShowDropDown] = useState(false);

    const formatHeading = (head) => {
        if (head === "Full Name") {
            head = "fullname"
        }
        if (head === "Date of Birth") {
            return "dob"
        }
        if (head === "Status") {
            return "assessment_status"
        }
        return head.replace(/\s+/g, "_").toLowerCase();
    }
    let dob = ""
    const data = props.data
    const rows = data !== null && data !== undefined ? Object.keys(data).map((key) => {
        if (key !== "id") {
            for (let heading of props.headings) {
                if (formatHeading(heading[0]) === key) {
                    if (key === 'dob' && checkIfDefined(data[key], false)) {
                        // dob = data[key].split("T")[0]
                        dob= data[key]
                    }
                    return (
                        <React.Fragment key={key}>
                            <td
                                className={(formatHeading(heading[0]) === key ? [classes.PatientRow_mobile, classes[heading[1]]].join(" ") : classes.RowCell)}
                            >
                                {
                                    formatHeading(heading[0]) !== "assessment_status"
                                        ? data[key] !== null && data[key] !== '' ? key !== 'dob' ? data[key] : dob : "---"
                                        : <div className={data[key] !== "New" ? classes.RowStatus: classes.RowStatus_new}>
                                            {data[key]}
                                        </div>
                                }
                            </td>

                        </React.Fragment >
                    )
                }
            }
        }
    }) : null

    const assessmentOnClickHandler = (assessment_id, client_id) => {
        props.OnFetchAssessment(props.token, assessment_id, client_id)
    }

    const onClickLinkNewClientHandler = (staff) => {
        setShowDropDown(false)
        props.OnSetStaffClientLinkPanel(true, staff)
        props.OnFetchStaffClients(props.token, staff.id)
    }

    const onClickDeleteStaffHandler = (fullname, id) => {
        setShowDropDown(false)
        props.setState({ fullname: fullname, id: id })
        props.OnSetConfirmModalDeleteStaff(true)
    }

    const onClickDeleteClientHandler = (fullname, id) => {
        setShowDropDown(false)
        props.setClientState({ fullname: fullname, id: id })
        props.OnSetConfirmModalDeleteClient(true)
    }

    const onClickUserRightsChange = (user_id, role) => {
        setShowDropDown(false)
        props.OnUpdatePrivileges(props.token, user_id, role)
    }

    const dropdown = !props.isStaff
        ? (
            <ul className={classes.DropDownContainer}>
                <Link to={`/assessmentpanel/${props.data.assessments[props.data.assessments.length - 1]}`}>
                    <li className={classes.DropDownButton_Assessment} onClick={() => assessmentOnClickHandler(props.data.assessments[props.data.assessments.length - 1], props.data.id)}>
                        Assessment panel
                </li>
                </Link>
                <Link to={`/clientprofile/${props.data.id}`}>
                    <li className={classes.DropDownButton_Profile} onClick={() => props.OnFetchClient(props.token, props.data.id)}>
                        Profile
                    </li>
                </Link>
                {
                    props.isArchived
                        ? < li className={classes.DropDownButton_Archive} onClick={() => props.OnUpdateClient(props.token, data.id, { ...data, archived: false }, true)}>
                            Unanrchive Client
                        </li>
                        : < li className={classes.DropDownButton_Archive} onClick={() => props.OnUpdateClient(props.token, data.id, { ...data, archived: true }, true)}>
                            Archive Client
                        </li>
                }

                {(props.role === "superuser" || props.role === "admin") &&
                    <li className={classes.DropDownButton_Delete} onClick={() => onClickDeleteClientHandler(props.data.fullname, props.data.id)}>
                        Delete Client
            </li>}

            </ul >
        )
        : (
            <ul className={classes.DropDownContainer}>
                <li className={classes.DropDownButton_Link} onClick={() => onClickLinkNewClientHandler(props.data)}>
                    Link new client/s
                </li>
                <li className={classes.DropDownButton_Delete} onClick={() => onClickDeleteStaffHandler(props.data.fullname, props.data.id)}>
                    Delete
                </li>
                {props.role === "superuser" &&
                    <li className={classes.DropDownButton_Privileges} onClick={() => onClickUserRightsChange(props.data.id, props.data.role === "staff" ? "admin" : "staff")}>
                        {props.data.role === "staff" ? "Grant admin privileges" : "Remove admin privileges"}
                    </li>}

            </ul>
        )

    const actions = (
        <td>
            <div className={classes.Options} onClick={() => setShowDropDown(true)}>
                <div className={classes.ThreeDots} ></div>
            </div>

            <OutsideAlerter setShowDropDown={setShowDropDown} show={showDropDown}>
                {showDropDown && dropdown}
            </OutsideAlerter>

        </td>
    )
    if (!props.loading_delete_staff && props.staffDeleteLoadingComplete) {
        setTimeout(() => {
            props.OnSetConfirmModalDeleteStaff(false)
            props.OnSetStaffDeleteLoadingComplete(false)
        }, 2000)
    }

    if (!props.loadingDeleteClient && props.clientDeleteComplete) {
        setTimeout(() => {
            props.OnSetConfirmModalDeleteClient(false)
        }, 2000)
    }

    return (
        <>
            <tr className={classes.Row}>
                {actions}
                {rows}
            </tr>
        </>
    )
}

export default Row