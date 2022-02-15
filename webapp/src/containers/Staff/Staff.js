import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import classes from './Staff.module.css'
import * as actions from '../../store/actions/users';
// import * as actionsClients from '../../store/actions/clients';
import { connect } from 'react-redux';
import LinkSidePanel from '../../components/LinkSidePanel/LinkSidePanel'
import LinkNewClientModal from '../../components/UI/Modals/LinkNewClientModal/LinkNewClientModal'
import { checkIfDefined } from '../../shared/Utility'
import RegisterStaffModal from '../../components/UI/Modals/RegisterStaffModal/RegisterStaffModal'
import ConfirmModal from '../../components/UI/Modals/ConfirmModal/ConfirmModal'
import FeedbackGlobal from '../../components/UI/FeedbackGlobal/FeedbackGlobal'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

const Staff = React.memo(props => {
    let headings = [["Full Name", "priority1"], ["Contact Number", "priority4"], ["Email", "priority2"]]

    useEffect(() => {
        props.OnFetchStaff(props.token, "Staff", 5, 1)
    }, [])

    const data = props.staff !== undefined
        ? props.staff
        : []

    const [state, setState] = useState({
        fullname: "",
        id: ""
    })

    return (
        <>
            <ConfirmModal
                show={props.showDeleteStaffModal}
                close={() => props.OnSetConfirmModalDeleteStaff(false)}
                removeHeading={props.staffDeleteLoadingComplete}
            >{!props.loading_delete_staff
                ? !props.staffDeleteLoadingComplete
                    ? <> <p>By clicking confirm you are agreeing to <strong>delete {state.fullname}</strong>.</p>
                        <div className={classes.ButtonGroup}>
                            <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                            <Button buttonType={"primary"} clicked={() => props.OnDeleteStaff(props.token, state.id)}>Confirm</Button>
                        </div> </>
                    : <FeedbackGlobal type="Success" successMessage={"Successfully deleted!"} />
                : <Spinner calledLocation="Staff" loadingMessage={`Deleting ${state.fullname}`} />}
            </ConfirmModal>
            <div className={classes.Container}>
                <div className={classes.SummaryHeader}>
                    <div className={classes.BoxOne}>

                    </div>
                    <div className={classes.BoxTwo}>

                    </div>
                    <div className={classes.BoxThree}>

                    </div>
                    <div className={classes.BoxFour}>

                    </div>
                </div>
                <Table
                    title={"Staff"}
                    createNewButtonTitle={"Staff"}
                    headings={headings}
                    data={data}
                    OnSetStaffClientLinkPanel={props.OnSetStaffClientLinkPanel}
                    OnSearchStaff={props.OnSearchStaff}
                    OnFetchStaff={props.OnFetchStaff}
                    OnDeleteStaff={props.OnDeleteStaff}
                    OnSetConfirmModalDeleteStaff={props.OnSetConfirmModalDeleteStaff}
                    showDeleteStaffModal={props.showDeleteStaffModal}
                    OnSetStaffDeleteLoadingComplete={props.OnSetStaffDeleteLoadingComplete}
                    staffDeleteLoadingComplete={props.staffDeleteLoadingComplete}
                    loading_delete_staff={props.loading_delete_staff}
                    OnFetchStaffClients={props.OnFetchStaffClients}
                    loading={props.loading}
                    totalUsers={props.totalUsers}
                    lowerRange={props.lowerRange}
                    upperRange={props.upperRange}
                    OnSetRegisterStaffModal={props.OnSetRegisterStaffModal}
                    role={props.role}
                    loading_update_privileges={props.loading_update_privileges}
                    OnUpdatePrivileges={props.OnUpdatePrivileges}
                    setState={setState}
                    token={props.token}
                />
            </div>
            <LinkSidePanel
                isOpen={props.showStaffClientLinkPanel}
                OnSetStaffClientLinkModal={props.OnSetStaffClientLinkModal}
                close={() => props.OnSetStaffClientLinkPanel(false)}
                selectedStaff={props.selectedStaff}
                OnDeleteStaffClientLink={props.OnDeleteStaffClientLink}
                loading_delete_link={props.loading_delete_link}
                selectedStaffClients={checkIfDefined(props.selectedStaffClients, [])}
                loadingFetchingStaffClients={props.loadingFetchingStaffClients}
                token={props.token}
            />
            < LinkNewClientModal
                show={props.showStaffClientLinkModal}
                close={() => props.OnSetStaffClientLinkModal(false)}
                selectedStaff={props.selectedStaff}
                clients={props.clients}
                OnSearchClients={props.OnSearchClientsLinkModal}
                OnCreateStaffClientLink={props.OnCreateStaffClientLink}
                loading_link={props.loading_link}
                userId={props.userId}
                loadingSearchStaffClients={props.loadingSearchStaffClients}
                OnDeleteStaffClientLink={props.OnDeleteStaffClientLink}
                loading_delete_link={props.loading_delete_link}
                token={props.token}
            />
            <RegisterStaffModal
                show={props.showRegisterStaffModal}
                close={() => props.OnSetRegisterStaffModal(false)}
                showRegisterStaffConfirmModal={props.showRegisterStaffConfirmModal}
                registeringStaffComplete={props.registeringStaffComplete}
                OnSetRegisterStaffConfirmModal={props.OnSetRegisterStaffConfirmModal}
                OnSetRegisteringStaffComplete={props.OnSetRegisteringStaffComplete}
                loadingRegisterStaff={props.loadingRegisterStaff}
                OnRegisterStaffUser={props.OnRegisterStaffUser}
                error={props.error}
                token={props.token}
            />
        </>
    )
})

const mapStateToProps = state => {
    return {
        staff: state.users.staff,
        loading: state.users.loading,
        showStaffClientLinkModal: state.users.showStaffClientLinkModal,
        showStaffClientLinkPanel: state.users.showStaffClientLinkPanel,
        selectedStaff: state.users.selectedStaff,
        clients: state.users.clients,
        showDeleteStaffModal: state.users.showDeleteStaffModal,
        staffDeleteLoadingComplete: state.users.staffDeleteLoadingComplete,
        loading_delete_staff: state.users.loading_delete_staff,
        loading_link: state.users.loading_link,
        loading_delete_link: state.users.loading_delete_link,
        selectedStaffClients: state.users.selectedStaffClients,
        totalUsers: state.users.totalUsers,
        lowerRange: state.users.lowerRange,
        upperRange: state.users.upperRange,
        userId: state.auth.userId,

        showRegisterStaffModal: state.users.showRegisterStaffModal,
        showRegisterStaffConfirmModal: state.users.showRegisterStaffConfirmModal,
        registeringStaffComplete: state.users.registeringStaffComplete,
        loadingRegisterStaff: state.users.loadingRegisterStaff,
        role: state.auth.role,
        loading_update_privileges: state.users.loading_update_privileges,

        error: state.users.error,
        loadingSearchStaffClients: state.users.loadingSearchStaffClients,
        loadingFetchingStaffClients: state.users.loadingFetchingStaffClients,

        token: state.auth.token

    };
}
//can access these function to dispatch actions - via props
const mapDispatchToProps = dispatch => {
    return {
        OnFetchStaff: (token, filter, limit, pageNumber) => dispatch(actions.fetchStaff(token, filter, limit, pageNumber)),
        OnSetStaffClientLinkModal: (val) => dispatch(actions.setStaffClientLinkModal(val)),
        OnSetStaffClientLinkPanel: (val, selectedStaff) => dispatch(actions.setStaffClientLinkPanel(val, selectedStaff)),
        OnSearchStaff: (token, filter, search) => dispatch(actions.searchStaff(token, filter, search)),
        OnSearchClientsLinkModal: (token, search) => dispatch(actions.searchClientsLinkModal(token, search)),
        OnCreateStaffClientLink: (token, staff_id, updated_client_list, client) => dispatch(actions.createStaffClientLink(token, staff_id, updated_client_list, client)),
        OnDeleteStaffClientLink: (token, staff_id, updated_client_list, client) => dispatch(actions.deleteStaffClientLink(token, staff_id, updated_client_list, client)),
        OnDeleteStaff: (token, staff_id) => dispatch(actions.deleteStaff(token, staff_id)),
        OnSetConfirmModalDeleteStaff: (staff_id) => dispatch(actions.setConfirmModalDeleteStaff(staff_id)),
        OnSetStaffDeleteLoadingComplete: (value) => dispatch(actions.setStaffDeleteLoadingComplete(value)),
        OnFetchStaffClients: (token, staff_id) => dispatch(actions.fetchStaffClients(token, staff_id)),
        OnSetRegisterStaffModal: (val) => dispatch(actions.setRegisterStaffModal(val)),
        OnSetRegisterStaffConfirmModal: (val) => dispatch(actions.setRegisterStaffConfirmModal(val)),
        OnSetRegisteringStaffComplete: (val) => dispatch(actions.setRegisteringStaffComplete(val)),
        OnRegisterStaffUser: (token, user) => dispatch(actions.registerStaffUser(token, user)),
        OnUpdatePrivileges: (token, user_id, role) => dispatch(actions.updatePrivileges(token, user_id, role)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)