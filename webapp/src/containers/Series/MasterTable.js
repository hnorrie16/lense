import React, { useEffect, useState } from 'react'
import classes from './Clients.module.css'
import * as actions from '../../store/actions/clients';
import * as actionsAssessments from '../../store/actions/assessments';
import { connect } from 'react-redux';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
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



const MasterTable = (props) => {
    const [users, setUsers] = useState([])
    let location = useLocation();
    

 
    
    useEffect(() => {

        props.OnFetchClients(props.token, "exporttable", 0, location.state.supplierchild, 0)
    
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

            <div>
                <ul>
                    {users.map(user => (<li key={user.id}>{users.name}</li>))}
                </ul>
            </div>
           
            <div className={classes.Container}>     
                <MaterialTable  
                title = "Master Table"         
                columns={[
                    { title: 'Code', field: 'Code', editable: 'never'}, // Done
                    { title: 'Change', field: 'Change', editable: 'never'}, //Done
                    { title: 'Description', field: 'Description'}, //Done
                    { title: 'Stock', field: 'Stock', editable: 'never'}, //Done
                    { title: 'Index', field: 'Index', type: 'numeric'}, //
                    { title: 'RqsHC', field: 'RqsHC', type: 'boolean', lookup: {
                        'YES': true,
                        'NO': false
                    }},
                    { title: 'Sort', field: 'Sort'},
                    { title: 'Lens Group ID', field: 'LensGroupID',
                    lookup: {
    //Is a numeric value from 1- 9 but has been converted to text for the sake of the user understanding
                        1: 'Base Lenses Gladd (n=1.49)',
                        2: 'STOCK Single Vision - Add to 81BS001',
                        3: 'SURFACED Single Vision - Add to 82BS001',
                        4: 'Bi/Trifocals (Add to 84BS001)',
                        5: 'Varifocal Intermediate/Near (Add to 85BS001)',
                        6: 'Varifocal Distance/Near (Add to 86BS001)',
                        7: 'Add-Ons - Coatings',
                        8: 'Add-Ons - Tints',
                        9: 'Add-Ons - Other'
                    }
                
                
                
                
                },
                { title: 'lense_id', field: 'LenseID'},
                { title: 'category', field: 'Category'},
                { title: 'sort', field: 'Sort'}, 
                { title: 'supplier_parent', field: 'SupplierParent'},
                { title: 'abbreviation', field: 'Abbreviation'},
                { title: 'series_id', field: 'Series_ID'},
                { title: 'lense_group_id', field: 'LensGroupID'},
                { title: 'lense_group', field: 'LensGroup'},
                { title: 'rule_1', field: 'Rule1'},
                { title: 'rule_2', field: 'Rule2'},
                { title: 'rule_3', field: 'Rule3'},
        
                { title: 'type', field: 'Type'},
                { title: 'start_date', field: 'StartDate'},
                { title: 'end_date', field: 'EndDate'},
                { title: 'active', field: 'Active'},
                { title: 'description', field: 'Description'},
                { title: 'code', field: 'Code'},
                { title: 'change', field: 'Change'},
                { title: 'pack', field: 'Pack'},
                { title: 'stock', field: 'Stock'},
                { title: 'index', field: 'Index'},
                { title: 'UV', field: 'UV', type: 'boolean', lookup: {
                    'UV': true,
                    '': false
                }},
                { title: 'AR', field: 'AR', type: 'boolean', lookup: {
                    'AR': true,
                    '': false
                }},
                { title: 'HC', field: 'HC', type: 'boolean', lookup: {
                    'HC': true,
                    '': false
                }},
                { title: 'PH', field: 'PH', type: 'boolean', lookup: {
                    'PH': true,
                    '': false
                }},
                { title: 'PO', field: 'PO', type: 'boolean', lookup: {
                    'PO': true,
                    '': false
                }},
                { title: 'TL', field: 'TL', type: 'boolean', lookup: {
                    'TL': true,
                    '': false
                }},
                { title: 'TD', field: 'TD', type: 'boolean', lookup: {
                    'TD': true,
                    '': false
                }},
                { title: 'MC', field: 'MC', type: 'boolean', lookup: {
                    'MC': true,
                    '': false
                }},
                // { title: 'oaprint', field: 'OAPrint'},
                // { title: 'medaidprint', field: 'MedAidPrint'},
                // { title: 'discprint', field: 'DiscPrint'}
                ]} 
                    options={{
                    exportButton: true,
                    filtering: true,
                    pageSize: 50,                                                                                                                                                       
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

export default connect(mapStateToProps, mapDispatchToProps)(MasterTable)