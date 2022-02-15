import React, { useState, useRef, useCallback, useEffect } from 'react'
import classes from './Table.module.css'
import Row from './Row/Row'
import debounce from 'lodash.debounce';
import SearchIcon from '../../Assets/Icons/search.svg'
import chevronright from '../../Assets/Icons/chevron-right.svg'
import chevronleft from '../../Assets/Icons/chevron-left.svg'
import chevronright_disabled from '../../Assets/Icons/chevron-right_disabled.svg'
import chevronleft_disabled from '../../Assets/Icons/chevron-left_disabled.svg'

const Table = (props) => {

    const [tableState, _setTableState] = useState({
        filter: props.title === "Clients" ? "Active" : "Staff",
        limit: 5,
        pageNumber: 1
    })

    const tableStateRef = useRef(tableState);

    const setTableState = val => {
        tableStateRef.current = val;
        _setTableState(val);
    }

    const [search, _setSearch] = useState("")
    const searchRef = useRef(search);

    const setSearch = val => {
        searchRef.current = val;
        _setSearch(val);
    }

    //delaying the automatic search by 600ms
    const delayedSearch = useCallback(debounce(() => searchRef.current !== '' ? props.title === "Clients" ? props.OnSearchClients(props.token, searchRef.current, tableStateRef.current.filter, props.userId) : props.OnSearchStaff(props.token, tableStateRef.current.filter, searchRef.current) : null, 600), [search])

    const inputChangeHandler = (e) => {
        let search = searchRef.current;
        search = e.target.value;
        setSearch(search);

        if (search === '') {
            setTableState({ ...tableState, pageNumber: 1 })
            props.title === "Clients" ? props.OnFetchClients(props.token, tableStateRef.current.filter, props.userId, tableStateRef.current.limit, 1) : props.OnFetchStaff(props.token, tableStateRef.current.filter, tableStateRef.current.limit, tableStateRef.current.pageNumber)
        }
    }

    const manualSearch = (value) => {
        props.title === "Clients" ? props.OnSearchClients(props.token, searchRef.current, tableStateRef.current.filter, props.userId) : props.OnSearchStaff(props.token, tableStateRef.current.filter, searchRef.current)
    }


    const filterChangeHandler = (e) => {
        setTableState({ ...tableState, filter: e.target.value, pageNumber: 1 })
        props.title === "Clients" ? props.OnFetchClients(props.token, e.target.value, props.userId, tableStateRef.current.limit, tableStateRef.current.pageNumber) : props.OnFetchStaff(props.token, e.target.value, tableStateRef.current.limit, tableStateRef.current.pageNumber)
    }

    const setLimit = (e) => {
        setTableState({ ...tableState, limit: e.target.value, pageNumber: 1 })
        props.title === "Clients" ? props.OnFetchClients(props.token, tableStateRef.current.filter, props.userId, tableStateRef.current.limit, tableStateRef.current.pageNumber) : props.OnFetchStaff(props.token, tableStateRef.current.filter, tableStateRef.current.limit, tableStateRef.current.pageNumber)
    }

    const setPageNumber = (num) => {
        setTableState({ ...tableState, pageNumber: num })
        props.title === "Clients" ? props.OnFetchClients(props.token, tableStateRef.current.filter, props.userId, tableStateRef.current.limit, tableStateRef.current.pageNumber) : props.OnFetchStaff(props.token, tableStateRef.current.filter, tableStateRef.current.limit, tableStateRef.current.pageNumber)
    }

    useEffect(() => {
        delayedSearch();
        return delayedSearch.cancel;
    }, [searchRef.current, delayedSearch]);

    //mapping the headings for the columns of the table
    const headings = props.headings.map(heading => {
        return <th
            key={heading}
            className={classes[heading[1]]}>
            {heading[0].toUpperCase()}
        </th>
    })

    props.loading && document.getElementById('scrollingcontainer').scrollTo(0, 0)

    const rows = props.data.map(row =>
        <Row
            key={row.id}
            data={row}
            headings={props.headings}
            //state changing methods
            OnFetchAssessment={props.OnFetchAssessment}
            OnUpdateClient={props.OnUpdateClient}
            isArchived={tableStateRef.current.filter === "Archived"}
            isStaff={props.title === "Staff"}
            OnSetStaffClientLinkPanel={props.OnSetStaffClientLinkPanel}
            OnDeleteStaff={props.OnDeleteStaff}
            OnSetConfirmModalDeleteStaff={props.OnSetConfirmModalDeleteStaff}
            showDeleteStaffModal={props.showDeleteStaffModal}
            OnSetStaffDeleteLoadingComplete={props.OnSetStaffDeleteLoadingComplete}
            staffDeleteLoadingComplete={props.staffDeleteLoadingComplete}
            loading_delete_staff={props.loading_delete_staff}
            OnFetchStaffClients={props.OnFetchStaffClients}
            OnFetchClient={props.OnFetchClient}
            role={props.role}
            loading_update_privileges={props.loading_update_privileges}
            OnUpdatePrivileges={props.OnUpdatePrivileges}
            setState={props.setState}
            setClientState={props.setClientState}
            OnDeleteClient={props.OnDeleteClient}
            OnSetConfirmModalDeleteClient={props.OnSetConfirmModalDeleteClient}
            showDeleteClientModal={props.showDeleteClientModal}
            loadingDeleteClient={props.loadingDeleteClient}
            clientDeleteComplete={props.clientDeleteComplete}
            token={props.token}
        />)

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h1>{props.title}</h1>

                <div className={classes.SearchContainer}>
                    {props.title === "Staff" &&
                        <button className={classes.AddButton} onClick={() => props.OnSetRegisterStaffModal(true)}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                                <path d="M12.75 7.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z"></path>
                                <path fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path>
                            </svg>
                    New Staff
                </button>}
                    <div className={classes.Search}>
                        <select onChange={(e) => filterChangeHandler(e)} className={classes.FilterDropdown}>
                            {props.title === "Clients"
                                ? <>
                                    <option>Active</option>
                                    <option>New</option>
                                    <option>Archived</option>
                                    <option>All</option>
                                </>
                                : <>
                                    <option>Staff</option>
                                    <option>Admin</option>
                                </>
                            }
                        </select>

                        <input placeholder="Search by name..." className={classes.SearchBar} onChange={(e) => inputChangeHandler(e)} value={searchRef.current} />

                        <button className={classes.SearchButton} onClick = {manualSearch}>
                            <img src={SearchIcon} alt="search icon" />
                        </button>
                    </div>
                </div>
            </div>

            <div className={classes.ScrollingContainer} id={"scrollingcontainer"}>
                <table className={classes.Table}>
                    <thead>
                        <tr className={classes.TableHeadingRow}>
                            <th>ACTIONS</th>
                            {headings}
                        </tr>
                    </thead>
                    <tbody className={!props.loading ? classes.Tbody : classes.Tbody_loading}>
                        {rows}
                    </tbody>
                </table>

            </div>
            <div className={classes.PagenationController}>
                <span className={classes.RowsPerPage}>Rows per page: </span>
                <select onChange={(e) => setLimit(e)}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
                <span className={classes.Ranges}>{props.lowerRange}-{props.upperRange} of {props.title === "Clients" ? props.totalClients : props.totalUsers}</span>
                <div className={classes.ChevronActions}>
                    <button className={tableStateRef.current.pageNumber !== 1 ? classes.LeftButton : classes.LeftButton_disabled} tabIndex="-1" type="button" title="Previous page" aria-label="Previous page" onClick={tableStateRef.current.pageNumber !== 1 ? () => setPageNumber(tableStateRef.current.pageNumber - 1) : null}>
                        <img src={tableStateRef.current.pageNumber !== 1 ? chevronleft : chevronleft_disabled} alt="chevron left" />
                    </button>
                    <button className={props.upperRange !== (props.title === "Clients" ? props.totalClients : props.totalUsers) ? classes.RightButton : classes.RightButton_disabled} tabIndex="0" type="button" title="Next page" aria-label="Next page" onClick={props.upperRange !== (props.title === "Clients" ? props.totalClients : props.totalUsers) ? () => setPageNumber(tableStateRef.current.pageNumber + 1) : null}>
                        <img src={props.upperRange !== (props.title === "Clients" ? props.totalClients : props.totalUsers) ? chevronright : chevronright_disabled} alt="chevron right" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table 