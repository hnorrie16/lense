import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import classes from './Clients.module.css'
import * as actions from '../../store/actions/clients';
import * as actionsAssessments from '../../store/actions/assessments';
import { connect } from 'react-redux';
import ConfirmModal from '../../components/UI/Modals/ConfirmModal/ConfirmModal'
import FeedbackGlobal from '../../components/UI/FeedbackGlobal/FeedbackGlobal'
import Button from '../../components/UI/Button/Button'
import ButtonStyle from '../../components/UI/Button/Button.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkIfDefined } from '../../shared/Utility'
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
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
import { Modal, Form, Col, Row} from 'react-bootstrap';
import { FormGroup, Icon, TextareaAutosize } from '@material-ui/core'
import Select from 'react-select';
import styls from '../../components/Table/Table.module.css'
import Moment from 'moment';

const _filefy = require("filefy");

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

  const exportCsv = (allColumns, allData) => {
    const columns = allColumns.filter(columnDef => columnDef["export"] !== false);
    const exportedData = allData.map(rowData => columns.map(columnDef => rowData[columnDef.field]));
    new _filefy.CsvBuilder('filename_' + Moment().format('YYYY-MM-DDTHHmmss'))
      .setDelimeter(';')
      .setColumns(columns.map(columnDef => columnDef.title))
      .addRows(exportedData)
      .exportFile();
  }


const Export = (props) => {

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




    const generateCodes = (e) => {
      
      alert('Generating all codes...')
      var codesDict = new Object();

     for(var client in props.clients){

        
        var newClient = Object.assign({}, props.clients[client]);
      //  var newClient = props.clients[2056]
      //  alert(newClient.Description)
        

        //=============== CREATING CODES ===================

        //1. Create Variables for each CHAR in Code
        let char1 = ''
        let char2 = ''
        let char34 = ''
        let char56 = ''
        let char7 = ''
        
        //IF lenses are Glass   --> Char1 = G
        //IF lenses are Plastic --> Char1 = P
        if(newClient.SAOAGroup == '7000'){
            char1 = '7'
        } else if (newClient.SAOAGroup == '8000'){
            char1 = '8'
        }

        //Char2 = LENSEGROUP ID
        char2 = newClient.LensGroupID

        //Char34 = ABBREVIATION
        char34 = newClient.Abbreviation
             

        
   
        //CHAR7
        if (newClient.Type == '' || newClient.Type == 'BASE'){
            //IGNORE
            
        } 
        
        if(newClient.Type == 'ADDON'){

          if(newClient.TD == 'TD'){
              char7 = 'Q'
          } else if (newClient.MC == 'MC') {
              char7 = 'R'
          } else if (newClient.PH == 'PH') {
              char7 = 'N'
          } else if (newClient.PO == 'PO') {
              char7 = 'S'
          } else {

              if(newClient.TL == 'TL') {
                char7 = 'P'
              } 
              
              
              else if (newClient.UV == 'UV' && newClient.AR == 'AR' && newClient.HC == 'HC') {
                char7 = 'F'
              } else if (newClient.TL == 'TL' && newClient.UV == 'UV' && newClient.AR == 'AR' && newClient.HC == 'HC') {
                char7 = 'F'
              }


              else if (newClient.UV == 'UV' && newClient.AR == 'AR') {
                char7 = 'G'
              } else if (newClient.TL == 'TL' && newClient.UV == 'UV' && newClient.AR == 'AR') {
                char7 = 'G'
              }

              else if (newClient.UV == 'UV' && newClient.HC == 'HC') {
                char7 = 'E'
              } else if (newClient.UV == 'UV' && newClient.HC == 'HC' && newClient.TL == 'TL') {
                char7 = 'E'
              }

              else if (newClient.AR == 'AR' && newClient.HC == 'HC') {
                char7 = 'D'
              } else if (newClient.AR == 'AR' && newClient.HC == 'HC' && newClient.TL == 'TL') {
                char7 = 'D'
              }

              else if (newClient.UV == 'UV') {
                char7 = 'C'
              } else if (newClient.UV == 'UV' && newClient.TL == 'TL') {
                char7 = 'C'
              }

              else if (newClient.AR == 'AR') {
                char7 = 'B'
              } else if (newClient.AR == 'AR' && newClient.TL == 'TL') {
                char7 = 'B'
              }

              else if (newClient.HC == 'HC') {
                char7 = 'A'
              } else if (newClient.HC == 'HC' && newClient.TL == 'TL') {
                char7 = 'A'
              }
          }


        } 
                
        if (newClient.Type == 'CORE' || newClient.Type == 'STOCK'){

          //========================================================================================================
          if(parseFloat(newClient.Index) < 1.51){
              char7 = '1'
          } else if (1.51 <= parseFloat(newClient.Index) && parseFloat(newClient.Index) <= 1.6 )
          {
            char7 = '2'
          } else {
            char7 = '3'
          }
          //========================================================================================================







          if (newClient.PH == 'PH' && newClient.PO != 'PO') {
            char7 = (parseFloat(char7) + 3) + ''

            // console.log(char7)
          } else if (newClient.PO == 'PO' && newClient.PH != 'PH') {
            char7 = (parseFloat(char7) + 6) + ''
           
             // console.log(char7)
          } else if (newClient.PO == 'PO' && newClient.PH == 'PH') {     
       
                  if(parseFloat(newClient.Index ) < 1.51 ){
                      char7 = 'A'
                  } else if (1.51 <= parseFloat(newClient.Index) && parseFloat(newClient.Index) <= 1.6 )
                  {
                    char7 = 'B'
                  } else{
                    char7 = 'C'
                  }
              }
           

              



          if(newClient.Type == 'CORE') {

              if (newClient.UV == 'UV') {
                if(parseFloat(newClient.Index) < 1.51){
                  char7 = 'D'
              } else if (1.51 <= parseFloat(newClient.Index) && parseFloat(newClient.Index) <= 1.6 )
              {
                char7 = 'E'
              } else if (1.6 < parseFloat(newClient.Index)) {
                char7 = 'F'
              } else{}
              }
          }

          if (newClient.TD == 'TD' || newClient.MC == 'MC') {
              char7 = 'Q'
          } else{}

        }


        //Deal with char 5&6
        // {
        //   81CY5: 0
        //   72JC0: 2
        //   81CY2: 0
        // }

        //Add each code to a global dictionairy, and everytime the same code appears, and 1 to the counter

        

        var temp_code = char1 + '' + char2 + '' + char34 + '' + char7

        if(temp_code in codesDict){
          codesDict[temp_code] += 1
        } else {
          codesDict[temp_code] = 1
        }

        char56 = ind[codesDict[temp_code]]

        newClient.Code = char1 + '' + char2 + '' + '' +char34 +  '' + char56 + '' + char7
        
       
       


        //=============== END CODES ===================
        new Promise((resolve) => {
          
         props.OnUpdateClient(props.token, props.clients[client].id, newClient, false);
          resolve() 
        })
        

    }


      
    };
    
   
    const clearCodes = (e) => {
      
      alert('Clearing all codes...')
  
      // Fetch all glasses data for series 7000 & 8000

      //Loop through each one and set its code to blank and update it on MongoDB
      for(var client in props.clients){

        

        
        var newClient = Object.assign({}, props.clients[client]);
        // alert(newClient.Description)
        newClient.Code = ''
        console.log(newClient.Code + ' --> CODE')

        
        props.OnUpdateClient(props.token, props.clients[client].id, newClient, false);
        // alert(JSON.stringify(client, null, 4));
      }


  
      // token, client_id, updated_client, isArchived
      alert('Clearing codes completed!')
  
      
    };



    const ClearChanges = (e) => {
      
      alert('Deleting items marked X')


      for(var client in props.clients){
        if(props.clients[client].Change == 'X'){
          props.OnDeleteClient(props.token, props.clients[client].id)
        }
      }


      for(var client in props.clients){

        
        var newClient = Object.assign({}, props.clients[client]);
        // alert(newClient.Description)
        newClient.Change = '';
        props.OnUpdateClient(props.token, props.clients[client].id, newClient, false);
        // alert(JSON.stringify(client, null, 4));
      }


      alert('Clearing items marked S and N')
  
      // Fetch all glasses data for series 7000 & 8000

      for(var client in props.clients){

        
        var newClient = Object.assign({}, props.clients[client]);
        // alert(newClient.Description)
        newClient.Change = '';
        props.OnUpdateClient(props.token, props.clients[client].id, newClient, false);
        // alert(JSON.stringify(client, null, 4));
      }


  
      // token, client_id, updated_client, isArchived
      alert('Clearing codes completed!')
  
      
    };


    const onLoginFormSubmit = (e) => {
        alert('Lets add a supplier!')
        props.onRegisterStaffUser(props.token, 'Hayden', 'norrie')
        alert('Done!')
        e.preventDefault();
        handleClose();
      };

      // ======================================================
    let headings = [['Description', 'priority1'], ['Type', 'priority6'], ['Date Created', 'priority8'], ['Code', 'priority2'], ['Type', 'priority5'],
    ['Change', 'priority9'], ['Status', 'priority4']]
    
    useEffect(() => {
        props.OnFetchClients(props.token, 'exporttable', 0, location.state.supplierchild, 0)
       // alert(JSON.stringify(props.clients[0], null, 4));


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
            <div className={classes.ButtonGroup} style={{display: 'flex', justifyContent:'left'}}>    
            <Button  clicked={() => {clearCodes()} }>Clear codes</Button>
            <Button  clicked={() => {generateCodes()} }>Generate codes</Button>
            <Button  clicked={() => {ClearChanges()} }>Start new Cycle</Button>
            </div>   

            <div className={classes.Container}>  
            </div>
            
                <MaterialTable  
                title = 'Export Table'   
                
                
                
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
                { title: 'supplierchild', field: 'SupplierChild', hidden: true},
                { title: 'series_id', field: 'Series_ID', hidden: true},
                { title: 'lense_group_id', field: 'LenseGroupID', hidden: true},
                { title: 'lense_group', field: 'LenseGroup', hidden: true},
                { title: 'rule_1', field: 'Rule1', hidden: true},
                { title: 'rule_2', field: 'Rule2', hidden: true},
                { title: 'rule_3', field: 'Rule3', hidden: true},
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
                { title: 'saoa', field: 'SAOAGroup', hidden: true},
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
                  exportCsv,
                    Button: true,
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

          
                  data = {data} icons={tableIcons}/>        
            </div>
        </>
    )

    
}


const LoginForm = ({ onSubmit, custData }) => {

    return (

<Form noValidate >
          <Row className='mb-3'>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
    <Form.Label>Description</Form.Label>
    <Form.Control as='textarea' rows={3} />
  </Form.Group>
  </Row>


  <Row className='mb-3'>

  <Form.Group
              as={Col}
              md='2'
              controlId='validationFormik103'
              className='position-relative'
            >
              <Form.Label>Index</Form.Label>
              <Form.Control
                type='text'
                placeholder='
                name='
              />

              <Form.Control.Feedback type='invalid' tooltip>
           
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md='6'
              controlId='validationFormik103'
              className='position-relative'
            >
              <Form.Label>Sort</Form.Label>
              <Form.Control
                type='number'
                placeholder='
                name='
                defaultValue={custData.Sort} //Add one!!
              />

              <Form.Control.Feedback type='invalid' tooltip>
           
              </Form.Control.Feedback>
            </Form.Group>


            <Row className='mb-3'>
<Form.Group
              as={Col}
              md='4'
              className='position-relative'>
                  <Form.Label>Lense Group</Form.Label>
                  
<select class='mb-3'>
<option>Default select</option>
  <option value='1'>STOCK Single Vision - Add to 71BS001</option>
  <option value='2'>SURFACED Single Vision - Add to 72BS001</option>
  <option value='4'>Bi/Trifocals (Add to 74BS001)</option>
  <option value='6'>Varifocal Distance/Near (Add to 76BS001)</option>
  <option value='7'>Add-Ons - Coatings</option>
  <option value='8'>Add-Ons - Tints</option>
  <option value='9'>Add-Ons - Other</option>
</select></Form.Group>
</Row>

            
            </Row>

            <Row className='mb-6'>

    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='RqsHQ' />
  </Form.Group>
  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='UV' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='AR' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='HC' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='PH' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='PO' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='TL' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='TD' />
  </Form.Group>

  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
    <Form.Check type='checkbox' label='MC' />
  </Form.Group>
  </Row>


       
         
         
          <Button type='submit'>Submit form</Button>
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


const ind = {

1:'00',2:'01',3:'02',4:'03',5:'04',6:'05',7:'06',8:'07',9:'08',10:'09',11:'10',12:'11',13:'12',14:'13',15:'14',16:'15',17:'16',18:'17',19:'18',20:'19',21:'20',22:'21',23:'22',24:'23',25:'24',26:'25',27:'26',28:'27',29:'28',30:'29',31:'30',32:'31',33:'32',34:'33',35:'34',36:'35',37:'36',38:'37',39:'38',40:'39',41:'40',42:'41',43:'42',44:'43',45:'44',46:'45',47:'46',48:'47',49:'48',50:'49',51:'50',52:'51',53:'52',54:'53',55:'54',56:'55',57:'56',58:'57',59:'58',60:'59',61:'60',62:'61',63:'62',64:'63',65:'64',66:'65',67:'66',68:'67',69:'68',70:'69',71:'70',72:'71',73:'72',74:'73',75:'74',76:'75',77:'76',78:'77',79:'78',80:'79',81:'80',82:'81',83:'82',84:'83',85:'84',86:'85',87:'86',88:'87',89:'88',90:'89',91:'90',92:'91',93:'92',94:'93',95:'94',96:'95',97:'96',98:'97',99:'98',100:'99',101:'A0',102:'A1',103:'A2',104:'A3',105:'A4',106:'A5',107:'A6',108:'A7',109:'A8',110:'A9',111:'B0',112:'B1',113:'B2',114:'B3',115:'B4',116:'B5',117:'B6',118:'B7',119:'B8',120:'B9',121:'C0',122:'C1',123:'C2',124:'C3',125:'C4',126:'C5',127:'C6',128:'C7',129:'C8',130:'C9',131:'D0',132:'D1',133:'D2',134:'D3',135:'D4',136:'D5',137:'D6',138:'D7',139:'D8',140:'D9',141:'E0',142:'E1',143:'E2',144:'E3',145:'E4',146:'E5',147:'E6',148:'E7',149:'E8',150:'E9',151:'F0',152:'F1',153:'F2',154:'F3',155:'F4',156:'F5',157:'F6',158:'F7',159:'F8',160:'F9',161:'G0',162:'G1',163:'G2',164:'G3',165:'G4',166:'G5',167:'G6',168:'G7',169:'G8',170:'G9',171:'H0',172:'H1',173:'H2',174:'H3',175:'H4',176:'H5',177:'H6',178:'H7',179:'H8',180:'H9',181:'J0',182:'J1',183:'J2',184:'J3',185:'J4',186:'J5',187:'J6',188:'J7',189:'J8',190:'J9',191:'K0',192:'K1',193:'K2',194:'K3',195:'K4',196:'K5',197:'K6',198:'K7',199:'K8',200:'K9',201:'L0',202:'L1',203:'L2',204:'L3',205:'L4',206:'L5',207:'L6',208:'L7',209:'L8',210:'L9',211:'M0',212:'M1',213:'M2',214:'M3',215:'M4',216:'M5',217:'M6',218:'M7',219:'M8',220:'M9',221:'N0',222:'N1',223:'N2',224:'N3',225:'N4',226:'N5',227:'N6',228:'N7',229:'N8',230:'N9',231:'P0',232:'P1',233:'P2',234:'P3',235:'P4',236:'P5',237:'P6',238:'P7',239:'P8',240:'P9',241:'Q0',242:'Q1',243:'Q2',244:'Q3',245:'Q4',246:'Q5',247:'Q6',248:'Q7',249:'Q8',250:'Q9',251:'R0',252:'R1',253:'R2',254:'R3',255:'R4',256:'R5',257:'R6',258:'R7',259:'R8',260:'R9',261:'S0',262:'S1',263:'S2',264:'S3',265:'S4',266:'S5',267:'S6',268:'S7',269:'S8',270:'S9',271:'T0',272:'T1',273:'T2',274:'T3',275:'T4',276:'T5',277:'T6',278:'T7',279:'T8',280:'T9',281:'U0',282:'U1',283:'U2',284:'U3',285:'U4',286:'U5',287:'U6',288:'U7',289:'U8',290:'U9',291:'V0',292:'V1',293:'V2',294:'V3',295:'V4',296:'V5',297:'V6',298:'V7',299:'V8',300:'V9',301:'W0',302:'W1',303:'W2',304:'W3',305:'W4',306:'W5',307:'W6',308:'W7',309:'W8',310:'W9',311:'X0',312:'X1',313:'X2',314:'X3',315:'X4',316:'X5',317:'X6',318:'X7',319:'X8',320:'X9',321:'Y0',322:'Y1',323:'Y2',324:'Y3',325:'Y4',326:'Y5',327:'Y6',328:'Y7',329:'Y8',330:'Y9',331:'Z0',332:'Z1',333:'Z2',334:'Z3',335:'Z4',336:'Z5',337:'Z6',338:'Z7',339:'Z8',340:'Z9',341:'0A',342:'1A',343:'2A',344:'3A',345:'4A',346:'5A',347:'6A',348:'7A',349:'8A',350:'9A',351:'0B',352:'1B',353:'2B',354:'3B',355:'4B',356:'5B',357:'6B',358:'7B',359:'8B',360:'9B',361:'0C',362:'1C',363:'2C',364:'3C',365:'4C',366:'5C',367:'6C',368:'7C',369:'8C',370:'9C',371:'0D',372:'1D',373:'2D',374:'3D',375:'4D',376:'5D',377:'6D',378:'7D',379:'8D',380:'9D',381:'0E',382:'1E',383:'2E',384:'3E',385:'4E',386:'5E',387:'6E',388:'7E',389:'8E',390:'9E',391:'0F',392:'1F',393:'2F',394:'3F',395:'4F',396:'5F',397:'6F',398:'7F',399:'8F',400:'9F',401:'0G',402:'1G',403:'2G',404:'3G',405:'4G',406:'5G',407:'6G',408:'7G',409:'8G',410:'9G',411:'0H',412:'1H',413:'2H',414:'3H',415:'4H',416:'5H',417:'6H',418:'7H',419:'8H',420:'9H',421:'0J',422:'1J',423:'2J',424:'3J',425:'4J',426:'5J',427:'6J',428:'7J',429:'8J',430:'9J',431:'0K',432:'1K',433:'2K',434:'3K',435:'4K',436:'5K',437:'6K',438:'7K',439:'8K',440:'9K',441:'0L',442:'1L',443:'2L',444:'3L',445:'4L',446:'5L',447:'6L',448:'7L',449:'8L',450:'9L',451:'0M',452:'1M',453:'2M',454:'3M',455:'4M',456:'5M',457:'6M',458:'7M',459:'8M',460:'9M',461:'0N',462:'1N',463:'2N',464:'3N',465:'4N',466:'5N',467:'6N',468:'7N',469:'8N',470:'9N',471:'0P',472:'1P',473:'2P',474:'3P',475:'4P',476:'5P',477:'6P',478:'7P',479:'8P',480:'9P',481:'0Q',482:'1Q',483:'2Q',484:'3Q',485:'4Q',486:'5Q',487:'6Q',488:'7Q',489:'8Q',490:'9Q',491:'0R',492:'1R',493:'2R',494:'3R',495:'4R',496:'5R',497:'6R',498:'7R',499:'8R',500:'9R',501:'0S',502:'1S',503:'2S',504:'3S',505:'4S',506:'5S',507:'6S',508:'7S',509:'8S',510:'9S',511:'0T',512:'1T',513:'2T',514:'3T',515:'4T',516:'5T',517:'6T',518:'7T',519:'8T',520:'9T',521:'0U',522:'1U',523:'2U',524:'3U',525:'4U',526:'5U',527:'6U',528:'7U',529:'8U',530:'9U',531:'0V',532:'1V',533:'2V',534:'3V',535:'4V',536:'5V',537:'6V',538:'7V',539:'8V',540:'9V',541:'0W',542:'1W',543:'2W',544:'3W',545:'4W',546:'5W',547:'6W',548:'7W',549:'8W',550:'9W',551:'0X',552:'1X',553:'2X',554:'3X',555:'4X',556:'5X',557:'6X',558:'7X',559:'8X',560:'9X',561:'0Y',562:'1Y',563:'2Y',564:'3Y',565:'4Y',566:'5Y',567:'6Y',568:'7Y',569:'8Y',570:'9Y',571:'0Z',572:'1Z',573:'2Z',574:'3Z',575:'4Z',576:'5Z',577:'6Z',578:'7Z',579:'8Z',580:'9Z',
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Export)


                //     const dat = {
                //     'LensID': '53',
                //     'Category': 'Materials Lenses',
                //     'field3': ',
                //     'Sort': '11',
                //     'SupplierParent': 'Unbranded',
                //     'SupplierChild': 'Unbranded',
                //     'Abbreviation': 'UB',
                //     'Series_ID': 'Plastic (CR39) Lenses',
                //     'LenseGroupID': '1',
                //     'LenseGroup': 'STOCK Single Vision - Add to 81BS001',
                //     'Rule1': 'Can add to 81BS001',
                //     'Rule2': ',
                //     'Rule3': ',
                //     'RqsHC': 'NO',
                //     'Type': 'STOCK',
                //     'StartDate': '05/01/2017',
                //     'EndDate': ', 
                //     'Active': '1',
                //     'Code': '22222',
                //     'Change': ',
                //     'Description': 'Unbranded 1.50 Uncoated 1.5 Standard',
                //     'Pack': ',
                //     'Stock': 'Y',
                //     'Index': '1.65',
                //     'UV': 'UV',
                //     'AR': 'AR',
                //     'HC': 'HC', 
                //     'PH': 'PH',
                //     'PO': 'PO',
                //     'TL': 'TL',
                //     'TD': 'TD',
                //     'MC': 'MC',
                //     'OAPrint': '1',
                //     'MedAidPrint': '1',
                //     'DiscPrint': '1',
                //     'Company': 'Zeiss',
                //     'field39': ',
                //     'field40': ',
                //     'field41': ',
                //     'SAOAGroup': '7000'
                //   }