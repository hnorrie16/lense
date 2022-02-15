import React, { useEffect, useRef, useState } from 'react';
import Overlay from '../../Overlay/Overlay';
import classes from './LinkNewClientModal.module.css'
import Cross from '../../../../Assets/Icons/cross.svg'
import { checkIfDefined } from '../../../../shared/Utility';
import ticked from '../../../../Assets/Icons/ticked.svg';
import Spinner from '../../Spinner/Spinner'
const LinkNewClientModal = props => {

    const [state, _setState] = useState({
        showResult: false,
        selectedClient: {},
        search: "",
        clientID: 0
    })

    let stateRef = useRef(state);

    const setState = (val) => {
        stateRef.current = val;
        _setState(val)
    }

    const onClientClickHandler = (client) => {
        setState({ ...state, showResult: false, selectedClient: client })
        props.OnCreateStaffClientLink(props.token, props.selectedStaff.id, { ...props.selectedStaff.clients, [stateRef.current.selectedClient.id]: true }, stateRef.current.selectedClient)
    }

    const onChangeHandler = (value) => {
        let search = stateRef.current.search;
        search = value;
        setState({ ...state, search: search, showResult: true })
    }

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault()
            submitSearch()
        }
    }

    const onClickDeleteHandler = (client) => {
        setState({ ...state, selectedClient: client })
        delete props.selectedStaff.clients[client.id]
        props.OnDeleteStaffClientLink(props.token, props.selectedStaff.id, props.selectedStaff.clients, client)
    }

    let [hover, _setHover] = useState(false);
    const hoverRef = useRef(hover);

    const setHover = data => {
        hoverRef.current = data;
        _setHover(data);
    }
    //on hovering over the presentation column of a row, the presenation element will show 
    const onMouseEnter = e => {
        console.log(e)
        setHover(true);
        setState({ ...state, clientID: e })
    };
    const onMouseLeave = e => {
        setHover(false);
    };

    useEffect(() => {
        props.OnSearchClients(props.token, "")
    }, [props.show])

    const submitSearch = () => {
        props.OnSearchClients(props.token, stateRef.current.search)
    }

    const clients = checkIfDefined(props.clients, []).map(client => (
        <tr key={client.id_number} className={classes.Row}>
            <td className={classes.ActionLink} >
                {!props.loading_link && !props.loading_delete_link
                    ?
                    <button onMouseEnter={() => onMouseEnter(client.id)} onMouseLeave={onMouseLeave} className={client.selected
                        ? classes.LinkButton_selected
                        : classes.LinkButton} onClick={!client.selected ? () => onClientClickHandler(client) : () => onClickDeleteHandler(client)}>
                        {client.selected ? hoverRef.current && stateRef.current.clientID === client.id ? "-" : <img src={ticked} alt="ticked" /> : "+"}
                    </button>
                    : <button className={client.selected
                        ? classes.LinkButton_selected
                        : classes.LinkButton}>
                        {stateRef.current.selectedClient.id === client.id
                            ? <i className="fa fa-circle-o-notch fa-spin"></i>
                            : client.selected ? <img src={ticked} alt="ticked" /> : "+"}
                    </button>
                }
            </td>
            <td className={classes.DataHeadings}>{client.fullname}</td>
            <td className={classes.Data}>{client.id_number}</td>
        </tr>
    ))
    //Uses the Overlay component as a backdrop. The modal closes when you press the overlay
    return (
        <Overlay show={props.show} close={props.close} classCustom={props.classCustom}>
            <div className={props.show ? [classes.ModalVisible, props.clsWidth, props.styleModal].join(' ') : classes.ModalHidden}>
                <div className={classes.Header}>
                    <h2>Create staff client link</h2>
                    <img src={Cross} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /> {/* Modal closes on pressing the cross icon */}
                </div>
                <div className={classes.InnerModalContainer}>
                    {/* <p>Search for a client and link them to <strong>{props.selectedStaff.fullname}</strong></p> */}
                    <div className={classes.SearchContainer}>
                        <input placeholder="Search clients..." className={classes.SearchBar} onChange={(e) => onChangeHandler(e.target.value)} onKeyDown={(e) => keyPress(e)} />
                        <button type="button" className={classes.SearchButton} onClick={submitSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(73, 77, 83)" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                    {!props.loadingSearchStaffClients
                        ? props.codes !== clients && props.codes !== clients && checkIfDefined(clients, []).length !== 0 ?
                            <table className={classes.Table}>
                                <thead>
                                    <tr className={classes.TableHeadingRow}>
                                        <th></th>
                                        <th>FULL NAME</th>
                                        <th>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients}
                                </tbody>
                            </table>
                            : <h4>Please search for a client.</h4>
                        : <Spinner />
                    }
                    {/* <div className={classes.ButtonGroup}>
                        <Button buttonType={"secondary"}>Cancel</Button>
                        <Button buttonType={"primary"} clicked={() => props.OnCreateStaffClientLink(props.selectedStaff.id, stateRef.current.selectedClient)}>Link</Button>
                    </div> */}
                </div>
            </div>
        </Overlay>
    )
};

export default LinkNewClientModal;

