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
import Save from '@material-ui/icons/Save';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Modal, Form, Col, Row} from "react-bootstrap";
import { FormGroup, Icon, TextareaAutosize } from '@material-ui/core'
import Select from 'react-select';

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



const SeriesEight = (props) => {

    const [users, setUsers] = useState([])
    const location = useLocation();


    // Modal Data 
    // ======================================================

    const [show, setShow] = useState(false);
    const [customRowData, setCustomRowData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (rowData) => {
        setShow(true);
        setCustomRowData(rowData);

    }
    //alert(rowData.Sort) Works!!
    

    const onLoginFormSubmit = (e) => {
        alert('Lets add a supplier!')
        props.onRegisterStaffUser(props.token, 'Hayden', 'norrie')
        alert('Done!')
        e.preventDefault();
        handleClose();
      };

      // ======================================================

 
    let headings = [["Description", "priority1"], ["Type", "priority6"], ["Date Created", "priority8"], ["Code", "priority2"], ["Type", "priority5"],
    ["Change", "priority9"], ["Status", "priority4"]]
    
    useEffect(() => {
        props.OnFetchClients(props.token, "8000", 0, location.state.supplierchild, 0)
        alert(props.clients.length)
    }, [])

    const data = props.clients !== undefined
        ? props.clients
        : []
  

    return (
        <>
<Modal  show={show} onHide={handleClose} style = {{position: 'absolute'}}>
        <Modal.Header closeButton>
          <Modal.Title>New Lenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} custData={customRowData} />
        </Modal.Body>
      </Modal>

            <div>
                <ul>
                    {users.map(user => (<li key={user.id}>{users.name}</li>))}
                </ul>
            </div>
           
            <div className={classes.Container}>     
                <MaterialTable  
                title = "Series 7000"   
                
                
                
                columns={[
                    { title: 'Code', field: 'Code', editable: 'never'}, //, field: 'sort'
                    { title: 'Change', field: 'Change', editable: 'never'},
                    { title: 'Description', field: 'Description'},
                    { title: 'Stock', field: 'Stock', editable: 'never'},
                    { title: 'Index', field: 'Index'},
                    { title: 'RqsHC', field: 'RqsHC', lookup: {
                        'YES': 'YES',
                        'NO': 'NO'
                    }},
                    { title: 'Sort', field: 'Sort'},
                    { title: 'Lens Group ID', field: 'LensGroupID',
                lookup: {

                    //'1': 'Base Lenses Gladd (n=1.523)',
                    '1': 'STOCK Single Vision - Add to 71BS001',
                    '2': 'SURFACED Single Vision - Add to 72BS001',
                    '4': 'Bi/Trifocals (Add to 74BS001)',
                    '6': 'Varifocal Distance/Near (Add to 76BS001)',
                    '7': 'Add-Ons - Coatings',
                    '8': 'Add-Ons - Tints',
                    '9': 'Add-Ons - Other'
                }         
            
            },
                { title: 'lense_id', field: 'LensID', hidden: true},
                { title: 'category', field: 'Category', hidden: true},
                { title: 'abbreviation', field: 'Abbreviation', hidden: true},
                { title: 'OAPrint', field: 'OAPrint'},  
                { title: 'supplier_parent', field: 'SupplierParent', hidden: true},
                { title: 'abbreviation', field: 'SupplierChild', hidden: true},
                { title: 'series_id', field: 'Series_ID', hidden: true},
                { title: 'lense_group_id', field: 'LenseGroupID', hidden: true},
                { title: 'lense_group', field: 'LenseGroup', hidden: true},
                { title: 'rule_1', field: 'Rule1', hidden: true},
                { title: 'rule_2', field: 'Rule2', hidden: true},
                { title: 'rule_4', field: 'Rule3', hidden: true},
                { title: 'type', field: 'Type', hidden: true},
                { title: 'start_date', field: 'StartDate', hidden: true},
                { title: 'end_date', field: 'EndDate', hidden: true},
                { title: 'active', field: 'Active', hidden: true},
                { title: 'description', field: 'Description', hidden: true},
                { title: 'code', field: 'Code', hidden: true},
                { title: 'change', field: 'Change', hidden: true},
                { title: 'pack', field: 'Pack', hidden: true},
                { title: 'stock', field: 'Stock', hidden: true},
                { title: 'index', field: 'Index', hidden: true},
                { title: 'saoa', field: 'SAOAGroup'},
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
                }
                
            },



                ]} 
                options={{
                    exportButton: true,
                    filtering: true,
                    pageSize: 20,   
                                                                                                                                                                              
                    rowStyle: {
                        fontSize: 12,
                      //  backgroundColor: '#EEE'                                  
                      },
                      headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                      }

                  }}

                  actions={[
                    {
                      icon: AddCircleOutlineIcon,
                      tooltip: 'Add series 7000 after current selection',
                      onClick: (event, rowData) => handleShow(rowData)
                    }
                  ]}
                
                detailPanel={[
                    {
                      tooltip: 'Show Name',
                      render: rowData => {
                        return (
                          <div
                            style={{
                              fontSize: 18,
                              textAlign: 'left',
                              color: 'white',
                              padding: '20px',
                              backgroundColor: '#01579b',
                            }}
                          >
                              <strong>Details: </strong> <br />
                             
                            Code: {rowData.Company} <br />
                            Change: {rowData.Change} <br />
                            Decription: {rowData.Description} <br />
                            Stock: {rowData.Stock}<br />
                            Index: {rowData.Index}<br />
                            RsqHC:{rowData.RsqHC}<br />
                            Sort: {rowData.Sort}<br />
                            Lense Group ID:{ rowData.LensGroupID} <br />
                            UV: {rowData.UV}<br />
                            AR: {rowData.AR}<br />
                            HC: {rowData.HC}<br />
                            PH: {rowData.PH}<br />
                            PO: {rowData.PO}<br />
                            TL: {rowData.TL}<br />
                            TD: {rowData.TD}<br />
                            MC: {rowData.MC}<br />
                          </div>
                        )
                      },
                    }]}

                  editable={{
                    onRowUpdate: (newData, oldData) => //Must refresh after edit AND LensGroupID doesn't work
                      new Promise((resolve) => {
                        props.OnUpdateClient(props.token, oldData.id, newData, false)
                        resolve()
                  }),
                  onRowAdd: (newData) => //Develop Create Routes etc
                    new Promise((resolve) => {

                
                //Setting the deafult values!
                newData.Series_ID = 'Glass Lenses'
                newData.LensID = ''
                newData.Category = 'Material Lenses'
                newData.SAOAGroup = '7000'

                //Setting LenseGroup
                newData.Rule1 = ''
                newData.Rule2 = ''
                newData.Rule3 = ''
                newData.Stock = 'N'
                if(newData.RqsHC == 'YES'){
                    newData.Rule3 = 'Requires Hard Coat'
                }
                
                // if(newData.LensGroupID == '1'){
                //     newData.LenseGroup = 'Base Lenses Glass (n=1.523)'
                //     newData.Type = 'STOCK'
                //     newData.Stock = 'Y'
                //     newData.TL = ''
                // }
                if(newData.LensGroupID == '1'){
                    newData.LenseGroup = 'STOCK Single Vision - Add to 71BS001'
                    newData.Rule1 = "Can add to 71BS001"
                    newData.Type = 'CORE'
                } else if(newData.LensGroupID == '2'){
                    newData.LenseGroup = 'SURFACED Single Vision - Add to 72BS001'
                    newData.Rule1 = "Can add to 72BS001"
                    newData.Type = 'CORE'
                    newData.TL = ''
                } else if(newData.LensGroupID == '4'){
                    newData.LenseGroup = 'Bi/Trifocals (Add to 74BS001)'
                    newData.Rule1 = "Can add to 74BS001"
                    newData.Type = 'CORE'
                    newData.TL = ''
                } else if(newData.LensGroupID == '6'){
                    newData.LenseGroup = 'Varifocal Distance/Near (Add to 76BS001)'
                    newData.Rule1 = "Can add to 76BS001"
                    newData.Type = 'CORE'
                    newData.PO = ''
                    newData.TL = ''
                } else if(newData.LensGroupID == '7'){
                    newData.LenseGroup = 'Add-Ons - Coatings'
                    newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                    newData.Type = 'ADDON'
                    newData.Index = ''
                    newData.UV = ''
                    newData.AR = ''
                    newData.HC = ''
                    newData.PH = ''
                    newData.PO = ''
                    
                } else if(newData.LensGroupID == '8'){
                    newData.LenseGroup = 'Add-Ons - Tints'
                    newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                    newData.Type = 'ADDON'
                    newData.Index = ''
                    newData.UV = ''
                    newData.AR = ''
                    newData.HC = ''
                    newData.PH = ''
                    newData.PO = ''
                } else if(newData.LensGroupID == '9'){
                    newData.LenseGroup = 'Add-Ons - Other'
                    newData.Rule2 = 'Can add to all GLASS Core lenses'
                    newData.Type = 'ADDON'
                    newData.Index = ''
                    newData.UV = ''
                    newData.AR = ''
                    newData.HC = ''
                    newData.PH = ''
                    newData.PO = ''
                    newData.TL = ''
                    newData.TD = ''
                    newData.MC = ''
                }

                newData.Active = "TRUE"
                newData.Change = 'N'
                newData.Pack = ''
                newData.OAPrint = 'TRUE'



                
                   // props.OnCreate(props.token, newData)
                     resolve()
                    }),

                  onRowDelete: (oldData) => //Working
                    new Promise((resolve) => {
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


const LoginForm = ({ onSubmit, custData }) => {

    return (

<Form noValidate >
          <Row className="mb-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  </Row>


  <Row className="mb-3">

  <Form.Group
              as={Col}
              md="2"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Index</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name=""
              />

              <Form.Control.Feedback type="invalid" tooltip>
           
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Sort</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                name=""
                defaultValue={custData.Sort} //Add one!!
              />

              <Form.Control.Feedback type="invalid" tooltip>
           
              </Form.Control.Feedback>
            </Form.Group>


            <Row className="mb-3">
<Form.Group
              as={Col}
              md="4"
              className="position-relative">
                  <Form.Label>Lense Group</Form.Label>
                  
<select class="mb-3">
<option>Default select</option>
  <option value="1">STOCK Single Vision - Add to 71BS001</option>
  <option value="2">SURFACED Single Vision - Add to 72BS001</option>
  <option value="4">Bi/Trifocals (Add to 74BS001)</option>
  <option value="6">Varifocal Distance/Near (Add to 76BS001)</option>
  <option value="7">Add-Ons - Coatings</option>
  <option value="8">Add-Ons - Tints</option>
  <option value="9">Add-Ons - Other</option>
</select></Form.Group>
</Row>

            
            </Row>

            <Row className="mb-6">

    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="RqsHQ" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="UV" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="AR" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="HC" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="PH" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="PO" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="TL" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="TD" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="MC" />
  </Form.Group>
  </Row>


       
         
         
          <Button type="submit">Submit form</Button>
        </Form>
    );
  };

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
        OnCreate: (token, client_id) => dispatch(actions.createClient(token, client_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesEight)


                //     const dat = {
                //     'LensID': "53",
                //     'Category': "Materials Lenses",
                //     'field3': "",
                //     'Sort': "11",
                //     'SupplierParent': "Unbranded",
                //     'SupplierChild': "Unbranded",
                //     'Abbreviation': "UB",
                //     'Series_ID': "Plastic (CR39) Lenses",
                //     'LenseGroupID': "1",
                //     'LenseGroup': "STOCK Single Vision - Add to 81BS001",
                //     'Rule1': "Can add to 81BS001",
                //     'Rule2': "",
                //     'Rule3': "",
                //     'RqsHC': "NO",
                //     'Type': "STOCK",
                //     'StartDate': "05/01/2017",
                //     'EndDate': "", 
                //     'Active': "1",
                //     'Code': "22222",
                //     'Change': "",
                //     'Description': "Unbranded 1.50 Uncoated 1.5 Standard",
                //     'Pack': "",
                //     'Stock': "Y",
                //     'Index': "1.65",
                //     'UV': "UV",
                //     'AR': "AR",
                //     'HC': "HC", 
                //     'PH': "PH",
                //     'PO': "PO",
                //     'TL': "TL",
                //     'TD': "TD",
                //     'MC': "MC",
                //     'OAPrint': "1",
                //     'MedAidPrint': "1",
                //     'DiscPrint': "1",
                //     'Company': "Zeiss",
                //     'field39': "",
                //     'field40': "",
                //     'field41': "",
                //     'SAOAGroup': "7000"
                //   }