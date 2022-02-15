import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import classes from './Clients.module.css'
import * as actions from '../../store/actions/clients';
import * as actionsAssessments from '../../store/actions/assessments';
import { connect } from 'react-redux';
import ConfirmModal from '../../components/UI/Modals/ConfirmModal/ConfirmModal'
import FeedbackGlobal from '../../components/UI/FeedbackGlobal/FeedbackGlobal'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkIfDefined } from '../../shared/Utility'
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useLocation } from 'react-router-dom';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



const SeriesSix = (props) => {

    const [users, setUsers] = useState([])
    const location = useLocation();

    useEffect(() => {
       
    })    
    let headings = [["Description", "priority1"], ["Type", "priority6"], ["Date Created", "priority8"], ["Code", "priority2"], ["Type", "priority5"],
    ["Change", "priority9"], ["Status", "priority4"]]
    
    useEffect(() => {
        props.OnFetchClients(props.token,"6000", 0, location.state.company, 0)
    }, [])

    const [state, setState] = useState({
        fullname: "",
        id: ""
    })
    

    const data = props.clients !== undefined
        ? props.clients
        : []
  

    return (
        <>
            <ConfirmModal
                show={props.showDeleteClientModal}
                close={() => props.OnSetConfirmModalDeleteClient(false)}
                removeHeading={props.clientDeleteComplete}
            >{!props.loadingDeleteClient
                ? !props.clientDeleteComplete
                    ? <> <p>By clicking confirm you are agreeing to <strong>delete {state.fullname}</strong>.</p>
                        <div className={classes.ButtonGroup}>
                            <Button buttonType={"secondary"} clicked={() => props.OnSetConfirmModal(false)}>Cancel</Button>
                            <Button buttonType={"primary"} clicked={() => props.OnDeleteClient(props.token, state.id)}>Confirm</Button>
                        </div> </>
                    : <FeedbackGlobal type="Success" successMessage={"Successfully deleted!"} />
                : <Spinner calledLocation="Staff" loadingMessage={`Deleting ${state.fullname}`} />}
            </ConfirmModal>

            <div>
                <ul>
                    {users.map(user => (<li key={user.id}>{users.name}</li>))}
                </ul>
            </div>
           
            <div className={classes.Container}>     
                <MaterialTable  
                title = "Series 6000"         
                columns={[
                    { title: 'Lense_ID', field: 'LensID'}, //, field: 'sort'
                    { title: 'Category', field: 'Category'},
                    { title: 'Company', field: 'Company'},
                    { title: 'SAOAGroup', field: 'SAOAGroup'},
                    { title: 'SeriesGroup', field: 'Series_ID'},
                    { title: 'Sort', field: 'Sort'},
                    { title: 'LensGroup_ID', field: 'LensGroupID'}
                    // { title: 'Category'}, //, field: 'sort'
                    // { title: 'SAOASeries'},
                    // { title: 'Sort'},
                    // { title: 'Series_ID'},
                    // { title: 'LensGroup'},
                    // { title: 'Start Date'},
                    // { title: 'End Date'},
                    // { title: 'Code'},
                    // { title: 'Change'},
                    // { title: 'Description'}
                ]} 
                options={{
                    exportButton: true,
                    filtering: true,
                    pageSize: 20,                                                                                                                                                             
                    rowStyle: {
                        fontSize: 12,                                   
                      }
                  }}
                
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        //handleRowUpdate(newData, oldData, resolve);
                        props.OnUpdateClient(props.token, oldData.id, newData, false)
                        resolve()
                        window.location.reload();
                        return
                    
                        
                  }),
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                    
                     resolve()
                    }),

                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        alert('here')
                      //handleRowDelete(oldData, resolve)
                      props.OnDeleteClient(props.token, oldData.id)
                      props.data.splice(0, 1);
                      resolve()
                   
                      return
                      
                    }),
                  }}
                  data = {data} icons={tableIcons}/>        
            </div>
        </>
    )

    
}




const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        loading: state.clients.loading,
        userId: state.auth.userId,
        token: state.auth.token,
        totalClients: state.clients.totalClients,
        lowerRange: state.clients.lowerRange,
        upperRange: state.clients.upperRange,
        loadingDeleteClient: state.clients.loading_delete_client,
        clientDeleteComplete: state.clients.clientDeleteComplete,
        showDeleteClientModal: state.clients.showDeleteClientModal,
        role: state.auth.role,
        totals: state.clients.totals
    };
}
//can access these function to dispatch actions - via props
const mapDispatchToProps = dispatch => {
    return {
        OnFetchClients: (token, filter, userId, limit, pageNumber) => dispatch(actions.fetchClients(token, filter, userId, limit, pageNumber)),
        OnFetchClient: (token, client_id) => dispatch(actions.fetchClient(token, client_id)),
        OnFetchAssessment: (token, assessment_id, client_id) => dispatch(actionsAssessments.fetchAssessment(token, assessment_id, client_id)),
        OnSearchClients: (token, search, filter, userId) => dispatch(actions.searchClients(token, search, filter, userId)),
        OnUpdateClient: (token, client_id, updated_client, isArchived) => dispatch(actions.updateClient(token, client_id, updated_client, isArchived)),
        OnDeleteClient: (token, client_id) => dispatch(actions.deleteClient(token, client_id)),
        OnSetConfirmModalDeleteClient: (val) => dispatch(actions.setConfirmModalDeleteClient(val)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesSix)