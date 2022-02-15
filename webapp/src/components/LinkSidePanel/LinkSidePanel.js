import React, { useRef, useState } from 'react'
import classes from './LinkSidePanel.module.css'
import Cross from '../../Assets/Icons/cross.svg'
import { checkIfDefined } from '../../shared/Utility'
import Spinner from '../UI/Spinner/Spinner'

const LinkSidePanel = (props) => {
    const containerStyle = !props.isOpen ? classes.Container : [classes.Container, classes.OpenContainer].join(' ')
    const [selectedClient, _setSelectedClient] = useState("")

    let selectedClientRef = useRef(selectedClient)

    const setSelectedClient = (val) => {
        selectedClientRef.current = val;
        _setSelectedClient(val)
    }

    const onClickDeleteHandler = (client) => {
        setSelectedClient(client)
        delete props.selectedStaff.clients[client.id]
        props.OnDeleteStaffClientLink(props.token, props.selectedStaff.id, props.selectedStaff.clients, client)
    }

    const clients = props.selectedStaffClients.map(client => (
        <tr key={client.id_number} className={classes.Row}>
            <td className={classes.DeleteTD}>
                {!props.loading_delete_link
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(73, 77, 83)" className="bi bi-trash-fill" viewBox="0 0 16 16" onClick={() => onClickDeleteHandler(client)}>
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    : selectedClientRef.current === client.id
                        ? <i className="fa fa-circle-o-notch fa-spin"></i>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(73, 77, 83)" className="bi bi-trash-fill" viewBox="0 0 16 16" onClick={() => onClickDeleteHandler(client)}>
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>}
            </td>
            <td className={classes.DataHeadings}>{client.fullname}</td>
            <td className={classes.Data}>{client.id_number}</td>
        </tr>
    ))

    return (
        <div className={containerStyle}>
            <div className={classes.CloseContainer}>
                <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} />
            </div>
            <div className={classes.Top}>
                <div className={classes.StaffImage}>

                </div>
                <span>{props.selectedStaff.fullname}</span>
                <button onClick={() => props.OnSetStaffClientLinkModal(true)}>Link new client</button>
            </div>
            <div className={classes.Clients}>
                {!props.loadingFetchingStaffClients
                    ? checkIfDefined(props.selectedStaffClients, []).length !== 0
                        ? <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>FULL NAME</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients}
                            </tbody>
                        </table>
                        : <h3>No clients linked.</h3>

                    : <Spinner />}
            </div>

        </div>
    )
}

export default LinkSidePanel