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
import { Modal, Form, Col, Row, Dropdown} from "react-bootstrap";
import { FormGroup, Icon, TextareaAutosize } from '@material-ui/core'
import Select from 'react-select';
import Moment from 'moment';
import { format } from 'date-fns';




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



const SeriesSeven = (props) => {

  

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
    

    const addClient = (e) => {
        alert('Lets add a supplier!')
        alert('Done!')
        e.preventDefault();
        handleClose();
      };


      // ======================================================

 
    let headings = [["Description", "priority1"], ["Type", "priority6"], ["Date Created", "priority8"], ["Code", "priority2"], ["Type", "priority5"],
    ["Change", "priority9"], ["Status", "priority4"]]

    let lenseIdToLenseTypeMap = {0: "All lenses",
      1: "STOCK Single Vision",
     2: "SURFACED Single Vision",
     4: "Bi/Trifocals",
     6: "Varifocal Distance/Near",
     7: "Add-Ons - Coatings",    
     8: "Add-Ons - Tints", 
     9: "Add-Ons - Other"}
    
    useEffect(() => {

        props.OnFetchClients(props.token, "7000", 0, location.state.supplierchild, 0, location.state.lenseIdFilter)
        
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
          <LoginForm onSubmit={addClient} custData={customRowData} />
        </Modal.Body>
      </Modal>

            <div>
                <ul>
                    {users.map(user => (<li key={user.id}>{users.name}</li>))}
                </ul>
            </div>
           
            <div className={classes.Container}>     
                <MaterialTable  
                title = {location.state.supplierchild + "\nSeries 7000 - " + lenseIdToLenseTypeMap[location.state.lenseIdFilter]} 
                columns={[
                    { title: 'Code', field: 'Code', editable: 'never'}, //, field: 'sort'
                    { title: 'Change', field: 'Change', editable: 'never' , hidden: true},
                    { title: 'Description', field: 'Description'},
                    { title: 'Stock', field: 'Stock', editable: 'never'},
                    { title: 'Index', field: 'Index'},
                    { title: 'RqsHC', field: 'RqsHC', lookup: {
                        'YES': 'YES',
                        'NO': 'NO'
                    }, hidden: location.state.lenseIdFilter === 1},
                    { title: 'Sort', field: 'Sort', hidden: true},
                    { title: 'Lens Type', field: 'LenseGroupID',
                lookup: {

                    '1': 'STOCK Single Vision - Add to 71BS001',
                    '2': 'SURFACED Single Vision - Add to 72BS001',
                    '4': 'Bi/Trifocals (Add to 74BS001)',
                    '6': 'Varifocal Distance/Near (Add to 76BS001)',
                    '7': 'Add-Ons - Coatings',
                    '8': 'Add-Ons - Tints',
                    '9': 'Add-Ons - Other'
                }, editable: 'never', hidden: true    
            
            },
                { title: 'lense_id', field: 'LensID', hidden: true},
                { title: 'category', field: 'Category', hidden: true},
                { title: 'abbreviation', field: 'Abbreviation', hidden: true},
                { title: 'OAPrint', field: 'OAPrint', hidden: true},  
                { title: 'supplier_parent', field: 'SupplierParent', hidden: true},
                { title: 'Supplier Child', field: 'SupplierChild',  hidden: true},
                { title: 'series_id', field: 'Series_ID', hidden: true},
                { title: 'lense_group', field: 'LenseGroup', hidden: true},
                { title: 'rule_1', field: 'Rule1', hidden: true},
                { title: 'rule_2', field: 'Rule2', hidden: true},
                { title: 'rule_4', field: 'Rule3', hidden: true},
                { title: 'type', field: 'Type', hidden: true},
                { title: 'start_date', field: 'StartDate', hidden: true},
                { title: 'end_date', field: 'EndDate', hidden: true},
                { title: 'active', field: 'Active', hidden: true},
                { title: 'description', field: 'Description', hidden: true},
                { title: 'Code', field: 'Code', hidden: true},
                { title: 'change', field: 'Change', hidden: true, hidden: true},
                { title: 'pack', field: 'Pack', hidden: true},
                { title: 'stock', field: 'Stock', hidden: true},
                { title: 'index', field: 'Index', hidden: true},
                { title: 'saoa', field: 'SAOAGroup',  hidden: true},

                { title: 'UV', field: 'UV', type: 'boolean', lookup: {
                    'UV': 'YES',
                    '': 'NO'
                }},
                { title: 'AR', field: 'AR', type: 'boolean', lookup: {
                    'AR': 'YES',
                    '': 'NO'
                }, editable: 'never'},
                { title: 'HC', field: 'HC', type: 'boolean', lookup: {
                    'HC': 'YES',
                    '': 'NO'
                }, editable: 'never'},
                { title: 'PH', field: 'PH', type: 'boolean', lookup: {
                    'PH': 'YES',
                    '': 'NO'
                }},
                { title: 'PO', field: 'PO', type: 'boolean', lookup: {
                    'PO': 'YES',
                    '': 'NO'
                }},
                { title: 'TL', field: 'TL', type: 'boolean', lookup: {
                    'TL': 'YES',
                    '': 'NO'
                }},
                { title: 'TD', field: 'TD', type: 'boolean', lookup: {
                    'TD': 'YES',
                    '': 'NO'
                }},
                { title: 'MC', field: 'MC', type: 'boolean', lookup: {
                    'MC': 'YES',
                    '': 'NO'
                }, editable: 'never'
                
            },



                ]} 
                options={{
                    filtering: true,
                    pageSize: 20,  
                    addRowPosition: "first", 
                                                                                                                                                                              
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
                        if(oldData.Description != newData.Description){
                          newData.Change = "s"
                        } 


                        if(newData.LenseGroupID == '1'){
                            newData.LenseGroup = 'STOCK Single Vision - Add to 71BS001'
                            newData.Rule1 = "Can add to 71BS001"
                            newData.Type = 'CORE'
                        } else if(newData.LenseGroupID == '2'){
                            newData.LenseGroup = 'SURFACED Single Vision - Add to 72BS001'
                            newData.Rule1 = "Can add to 72BS001"
                            newData.Type = 'CORE'
                            newData.TL = ''
                        } else if(newData.LenseGroupID == '4'){
                            newData.LenseGroup = 'Bi/Trifocals (Add to 74BS001)'
                            newData.Rule1 = "Can add to 74BS001"
                            newData.Type = 'CORE'
                            newData.TL = ''
                        } else if(newData.LenseGroupID == '6'){
                            newData.LenseGroup = 'Varifocal Distance/Near (Add to 76BS001)'
                            newData.Rule1 = "Can add to 76BS001"
                            newData.Type = 'CORE'
                            newData.PO = ''
                            newData.TL = ''
                        } else if(newData.LenseGroupID == '7'){
                            newData.LenseGroup = 'Add-Ons - Coatings'
                            newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                            newData.Type = 'ADDON'
                            newData.Index = ''
                            newData.UV = ''
                            newData.AR = ''
                            newData.HC = ''
                            newData.PH = ''
                            newData.PO = ''
                            
                        } else if(newData.LenseGroupID == '8'){
                            newData.LenseGroup = 'Add-Ons - Tints'
                            newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                            newData.Type = 'ADDON'
                            newData.Index = ''
                            newData.UV = ''
                            newData.AR = ''
                            newData.HC = ''
                            newData.PH = ''
                            newData.PO = ''
                        } else if(newData.LenseGroupID == '9'){
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
                newData.LenseGroupID = location.state.lenseIdFilter;
                
                

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
                if(newData.LenseGroupID == '1'){
                    newData.LenseGroup = 'STOCK Single Vision - Add to 71BS001'
                    newData.Rule1 = "Can add to 71BS001"
                    newData.Type = 'CORE'
                } else if(newData.LenseGroupID == '2'){
                    newData.LenseGroup = 'SURFACED Single Vision - Add to 72BS001'
                    newData.Rule1 = "Can add to 72BS001"
                    newData.Type = 'CORE'
                    newData.TL = ''
                } else if(newData.LenseGroupID == '4'){
                    newData.LenseGroup = 'Bi/Trifocals (Add to 74BS001)'
                    newData.Rule1 = "Can add to 74BS001"
                    newData.Type = 'CORE'
                    newData.TL = ''
                } else if(newData.LenseGroupID == '6'){
                    newData.LenseGroup = 'Varifocal Distance/Near (Add to 76BS001)'
                    newData.Rule1 = "Can add to 76BS001"
                    newData.Type = 'CORE'
                    newData.PO = ''
                    newData.TL = ''
                } else if(newData.LenseGroupID == '7'){
                    newData.LenseGroup = 'Add-Ons - Coatings'
                    newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                    newData.Type = 'ADDON'
                    newData.Index = ''
                    newData.UV = ''
                    newData.AR = ''
                    newData.HC = ''
                    newData.PH = ''
                    newData.PO = ''
                    
                } else if(newData.LenseGroupID == '8'){
                    newData.LenseGroup = 'Add-Ons - Tints'
                    newData.Rule2 = 'Can add to all GLASS Base, Stock and Core lenses'
                    newData.Type = 'ADDON'
                    newData.Index = ''
                    newData.UV = ''
                    newData.AR = ''
                    newData.HC = ''
                    newData.PH = ''
                    newData.PO = ''
                } else if(newData.LenseGroupID == '9'){
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
                newData.MedAidPrint = ''
                


                //Extras
                  newData.field3= ""
                       newData.field39= ""
                       newData.field40= ""
                       newData.field41= ""
                       newData.DiscPrint=""
                       newData.Company = ""

                       //Todo
                       newData.Abbreviation = ""
                       newData.StartDate = format(new Date(), 'yyyy/MM/dd')
                       newData.EndDate = ""
                       newData.Code = ""
                       newData.SupplierChild = ""
                        newData.SupplierParent =  ""

         

//ABBREVIATION

                switch(location.state.supplierchild) {
                  case "*Base Lenses" :
                    newData.Abbreviation = "BS"
                    break;
                    case "*Generic" :
                      newData.Abbreviation = "GN"
                      break;
                      case "20/20 Vision Care" :
                        newData.Abbreviation = "UM"
                        // code block
                        break;
                        case "Apex Optical (Pty) Ltd" :
                          newData.Abbreviation = "AP"
                    // code block
                    break;
                    case "Arc Optics" :
                      newData.Abbreviation = "AR"
                    // code block
                    break;
                    case "Basic Optical" :
                      newData.Abbreviation = "BA"
                    // code block
                    break;
                    case "BBGR" :
                      newData.Abbreviation = "BB"
                    // code block
                    break;
                    case "BONO OPTICS" :
                      newData.Abbreviation = "BN"
                    // code block
                    break;
                    case "Carl Zeiss Vision - Synchrony" :
                      newData.Abbreviation = "CS"
                    // code block
                    break;
                    case "Carl Zeiss Vision - Zeiss" :
                      newData.Abbreviation = "CZ"
                    // code block
                    break;
                    case "Classic Eyes" :
                      newData.Abbreviation = "CE"
                    // code block
                    break;
                    case "Complete Eyewear" :
                      newData.Abbreviation = "CY"
                      // code block
                      break;
                      case "Crystalbrite" :
                        newData.Abbreviation = "CB"
                        // code block
                        break;
                        case "Damar Lab" :
                          newData.Abbreviation = "LS"
                          // code block
                          break;
                          case "Eagle Optical" :
                            newData.Abbreviation = "EA"
                            // code block
                            break;
                            case "Easyview" :
                              newData.Abbreviation = "EW"
                              // code block
                              break;
                              case "Elite Optical" :
                                newData.Abbreviation = "ET"
                                // code block
                                break;
                                case "Entry" :
                                  newData.Abbreviation = "VS"
                                  // code block
                                  break;
                                  case "eOptics" :
                                    newData.Abbreviation = "EL"
                                    // code block
                                    break;
                                    case "Essilor" :
                                      newData.Abbreviation = "ES"
                                      // code block
                                      break;
                                      case "Eyecon" :
                                        newData.Abbreviation = "EC"
                                        // code block
                                        break;
                                        case "Falcon Eyelab" :
                                          newData.Abbreviation = "FE"
                                          // code block
                                          break;
                                          case "Focus Optical" :
                                            newData.Abbreviation = "FC"
                                            // code block
                                            break;
                                            case "GKB" :
                                              newData.Abbreviation = "GK"
                                              // code block
                                              break;
                                              case "HLM Optics" :
                                                newData.Abbreviation = "HL"
                                              // code block
                                              break;
                                              case "Hoya" :
                                                newData.Abbreviation = "HY"
                                              // code block
                                              break;
                                              case "Indico" :
                                                newData.Abbreviation = "ND"
                                              // code block
                                              break;
                                              case "KFML" :
                                                newData.Abbreviation = "KF"
                                              // code block
                                              break;
                                              case "Kodak" :
                                                newData.Abbreviation = "KD"
                                              // code block
                                              break;
                                              case "Lenscape eOptics" : newData.Abbreviation = "EL"
                                              // code block
                                              break;
                                              case "Lenzxpress" : newData.Abbreviation = "LX"
                                              // code block
                                              break;
                                              case "Maui Jim" : newData.Abbreviation = "MJ"
                                              // code block
                                              break;
                                              case "MGear Eyewear" :newData.Abbreviation = "MG"
                                              // code block
                                              break;
                                              case "MR Lenses" :newData.Abbreviation = "MR"
                                              // code block
                                              break;
                                              case "Oakley" :newData.Abbreviation = "KL"
                                              // code block
                                              break;
                                              case "OS Optical" :newData.Abbreviation = "SC"
                                              // code block
                                              break;
                                              case "OTL Lens Lab" :newData.Abbreviation = "TL"
                                              // code block
                                              break;
                                              case "Pentax" :newData.Abbreviation = "PN"
                                              // code block
                                              break;
                                              case "Precision Optical" :newData.Abbreviation = "PP"
                                              // code block
                                              break;
                                              case "Quality Optical" :newData.Abbreviation = "LT"
                                              // code block
                                              break;
                                              case "Ray-Ban" :newData.Abbreviation = "RB"
                                              // code block
                                              break;
                                              case "Republic Optical" :newData.Abbreviation = "RP"
                                              // code block
                                              break;
                                              case "RVT Optical" :newData.Abbreviation = "RV"
                                              // code block
                                              break;
                                              case "Seiko" :newData.Abbreviation = "SK"
                                              // code block
                                              break;
                                              case "Seiko - Starvision" :newData.Abbreviation = "SV"
                                              // code block
                                              break;
                                              case "Shamir" :newData.Abbreviation = "SH"
                                              // code block
                                              break;
                                              case "Smith Optics" :newData.Abbreviation = "SM"
                                              // code block
                                              break;
                                              case "Specialized" :newData.Abbreviation = "SZ"
                                              // code block
                                              break;
                                              case "SpectiVision" :newData.Abbreviation = "SP"
                                              // code block
                                              break;
                                              case "Spherical" :newData.Abbreviation = "PH"
                                              // code block
                                              break;
                                              case "STEPPER" :newData.Abbreviation = "ST"
                                              // code block
                                              break;
                                              case "Thai Optical Group" :newData.Abbreviation = "TH"
                                              // code block
                                              break;
                                              case "The Lens Warehouse" :newData.Abbreviation = "LW"
                                                // code block
                                                break;
                                                case "Torga" :newData.Abbreviation = "TG"
                                                  // code block
                                                  break;
                                                  case "Ultimate Optical" :newData.Abbreviation = "UT"
                                                    // code block
                                                    break;
                                                    case "Unbranded" :newData.Abbreviation = "UB"
                                                      // code block
                                                      break;
                                                      case "Unique Optical" :newData.Abbreviation = "UP"
                                                        // code block
                                                        break;
                                                        case "VM5 Optical" :newData.Abbreviation = "VT"
                                                          // code block
                                                          break;
                                                          case "VME" :newData.Abbreviation = "VM"
                                                            // code block
                                                            break;
                                                            case "Vue Optical" :newData.Abbreviation = "VE"
                                                            // code block
                                                            break;
                                                            case "Wize Eyes" :newData.Abbreviation = "WE"
                                                            // code block
                                                            break;
                                                            case "Younger" :newData.Abbreviation = "YG"
                                                            // code block
                                                            break;


                  default:
                    // code block
                }
    

                const dat = {
                  'LensID': newData.LensID, 
                  'Category': newData.Category, 
                  'field3': newData.field3,
                  'Sort': newData.Sort,
                  'SupplierParent': location.state.supplierchild,
                  'SupplierChild': location.state.supplierchild,
                  'Abbreviation': newData.Abbreviation,
                  'Series_ID': newData.Series_ID,
                  'LenseGroupID': newData.LenseGroupID, 
                  'LenseGroup': newData.LenseGroup,
                  'Rule1': newData.Rule1,
                  'Rule2': newData.Rule2,
                  'Rule3': newData.Rule3,
                  'RqsHC': newData.RqsHC,
                  'Type': newData.Type,
                  'StartDate': newData.StartDate,
                  'EndDate': newData.EndDate, 
                  'Active': newData.Active,
                  'Code': newData.Code,
                  'Change': newData.Change,
                  'Description': newData.Description,
                  'Pack': newData.Pack,
                  'Stock': newData.Stock,
                  'Index': newData.Index,
                  'UV': newData.UV,
                  'AR': newData.AR,
                  'HC': newData.HC, 
                  'PH': newData.PH,
                  'PO': newData.PO,
                  'TL': newData.TL,
                  'TD': newData.TD,
                  'MC': newData.MC,
                  'OAPrint': newData.OA,
                  'MedAidPrint': newData.MedAidPrint,
                  'DiscPrint': newData.DiscPrint,
                  'Company': location.state.supplierchild,
                  'field39': newData.field39,
                  'field40': newData.field40,
                  'field41': newData.field41,
                  'SAOAGroup': newData.SAOAGroup
                }

                   props.OnCreate(props.token, dat)






                     resolve()
                    }),

                  onRowDelete: (oldData) => //Working
                  new Promise((resolve) => {
                    var newData = oldData
                    newData.EndDate = format(new Date(), 'yyyy/MM/dd')
                    newData.Change = "X"
                    props.OnUpdateClient(props.token, oldData.id, newData, false)
                    resolve()
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
    <Form.Check type="boolean" label="RqsHQ" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="UV" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="AR" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="HC" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="PH" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="PO" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="TL" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="TD" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="boolean" label="MC" />
  </Form.Group>
  </Row>


       
         
         
          <Button type="submit" clicked={() => {onSubmit()} }>Submit form</Button>
      
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
        OnFetchClients: (token, filter, userId, limit, pageNumber, lenseId) => dispatch(actions.fetchClients(token, filter, userId, limit, pageNumber, lenseId)),
        OnFetchClient: (token, client_id) => dispatch(actions.fetchClient(token, client_id)),
        OnFetchAssessment: (token, assessment_id, client_id) => dispatch(actionsAssessments.fetchAssessment(token, assessment_id, client_id)),
        OnSearchClients: (token, search, filter, userId) => dispatch(actions.searchClients(token, search, filter, userId)),
        OnUpdateClient: (token, client_id, updated_client, isArchived) => dispatch(actions.updateClient(token, client_id, updated_client, isArchived)),
        OnDeleteClient: (token, client_id) => dispatch(actions.deleteClient(token, client_id)),
        OnSetConfirmModalDeleteClient: (val) => dispatch(actions.setConfirmModalDeleteClient(val)),
        OnCreate: (token, client_id) => dispatch(actions.createClient(token, client_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesSeven)


             