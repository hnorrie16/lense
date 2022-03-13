import React, { useState, useEffect } from 'react'
import { Modal, Form, Dropdown, DropdownButton, Spinner, Nav} from "react-bootstrap";
import classes from './SideNavBar.module.css'
import looks from '../NavItem/NavItem.module.css'
import NavItem from '../NavItem/NavItem'
import Logo from '../../../Assets/Images/Sleep Science Logo File.png'
import * as actionsAssessments from '../../../store/actions/assessments'
import * as actionsUsers from '../../../store/actions/users'
import { connect } from 'react-redux';
import OutsideAlerter from '../../OutsideAlerter/OutsideAlerter'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import { FormGroup, Icon, TextareaAutosize } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import classess from '../NavItem/NavItem.module.css'
import * as actions from '../../../store/actions/clients';
import navItem from '../NavItem/NavItem';



const SideNavBar = (props) => {
    

    const [showDropDown, setShowDropDown] = useState(false);
    const history = useHistory();
    const role = (props.userRole)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data = props.clients !== undefined
    ? props.clients
    : []



  const onLoginFormSubmit = (e) => {
    alert('Lets add a supplier!')
    props.onRegisterStaffUser(props.token, 'Hayden', 'norrie')
    alert('Done!')
    e.preventDefault();
    handleClose();
  };
 


    //logs the user out of the system
    const logout = () => {
        history.push("/logout");
    }

    const dropdown = (
        <OutsideAlerter setShowDropDown={setShowDropDown} show={showDropDown}>
            {showDropDown &&
                <ul className={classes.DropDownContainer}>
                    <li className={classes.DropDownButton} onClick={() => props.OnSetUpdateStaffModal(true)} >
                        Edit your details
                    </li>
                    <li className={classes.DropDownButton} onClick={logout}>
                        Logout
                    </li>
                </ul>
            }
        </OutsideAlerter>
    )

    return (
        <>
        

<Modal  show={show} onHide={handleClose} style = {{position: 'absolute'}}>
        <Modal.Header closeButton>
          <Modal.Title>Create Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} />
        </Modal.Body>
      </Modal>
            <div className={classes.Container}>
                <img src={Logo} className={classes.Logo} alt="logo" style = {{padding: 5}}/>

                
                
                {/* <NavItem link={"/clients"}>Glasses</NavItem> */}
                {props.userRole == 'superuser'? <NavItem link={"/mastertable"}supplierchild={props.userDetails.supplierchild} >Master</NavItem>: null }
                {
                /* {props.userRole == 'superuser'? <NavItem link={"/seriesone"} company={props.userDetails.company} >Series 1000</NavItem>: null }
                {props.userRole == 'superuser'? <NavItem link={"/seriestwo"} company={props.userDetails.company}  >Series 2000</NavItem>: null }
                {props.userRole == 'superuser'? <NavItem link={"/seriesfour"}company={props.userDetails.company} >Series 4000</NavItem>: null }
                {props.userRole == 'superuser'? <NavItem link={"/seriesfive"}company={props.userDetails.company} >Series 5000</NavItem>: null }
                {props.userRole == 'superuser'? <NavItem link={"/seriessix"}company={props.userDetails.company} >Series 6000</NavItem>: null } */}


                <Nav >

                           <div>                
       {props.userRole == 'superuser' || props.userRole == 'supplier' || props.userRole == 'admin' ?  
                <DropdownButton id="dropdown-basic-button" title="   Glass   ">
                <Dropdown.Item link  href="/seriesseven">Base Lenses Glass</Dropdown.Item>
                <Dropdown.Item href="">STOCK Single Vision</Dropdown.Item>
                <Dropdown.Item href="">SURFACED Single Vision</Dropdown.Item>
                <Dropdown.Item href="">Bi/Trifocalsn</Dropdown.Item>
                <Dropdown.Item href="">Varifocal Distance/Near</Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Coatingsn</Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Tints</Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Other</Dropdown.Item>
          </DropdownButton>: 
                null }

{props.userRole == 'superuser' || props.userRole == 'supplier' || props.userRole == 'admin' ?  
                <DropdownButton  id="dropdown-basic-button" title="   Plastic   ">
                <Dropdown.Item link={"/stafftable"}  href="">Base Lenses Plastic</Dropdown.Item>
                <Dropdown.Item href="">STOCK Single Vision </Dropdown.Item>
                <Dropdown.Item href="">SURFACED Single Vision</Dropdown.Item>
                <Dropdown.Item href="">Accomodative Support Lenses</Dropdown.Item>
                <Dropdown.Item href="">Bi/Trifocals </Dropdown.Item>
                <Dropdown.Item href=""> Varifocal Intermediate/Near</Dropdown.Item>
                <Dropdown.Item href="">Varifocal Distance/Near  </Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Coatings</Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Tints</Dropdown.Item>
                <Dropdown.Item href="">Add-Ons - Other</Dropdown.Item>
          </DropdownButton>: 
                null }
               </div>       

                </Nav>
                
                
                {/* {props.userRole == 'superuser' || props.userRole == 'supplier' || props.userRole == 'admin' ? <NavItem link={"/serieseight"}supplierchild={props.userDetails.supplierchild} >Series 8000</NavItem>: null } */}
                {props.userRole == 'superuser' ? <NavItem link={"/stafftable"}company={props.userDetails.supplierchild} >Staff</NavItem>: null }
                {props.userRole == 'superuser' || props.userRole == 'admin'? <NavItem link={"/exporttable"}supplierchild={props.userDetails.supplierchild} >Export table</NavItem>: null }
                
                {/* {props.userRole == 'superuser'? 
                <Button clicked = {handleShow} className={classess.NavItem}>
                Add Supplier
            </Button>: null} */}
                

                <div className={classes.UserContainer} onClick={() => setShowDropDown(true)}>
                    <div className={classes.Circle}>

                    </div>
                    <div className={classes.Info}>
                        <span className={classes.UserFullName}>{props.userDetails.fullname}</span>
                        <span className={classes.UserRole}>{props.userRole.toUpperCase()}</span>
                    </div>
                    {dropdown}
                </div>

            </div>
        </>
    )
}

const LoginForm = ({ onSubmit }) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      return (

<Form>

<Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Surname</Form.Label>
    <Form.Control type="text" placeholder="Password" />
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Repeat Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>




  <FormGroup  className="mb-3" controlId="formBasicPassword" >
  <Form.Label>Company</Form.Label>
  <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    none
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Zeiss</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Goya</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </FormGroup>

  <FormGroup  className="mb-3" controlId="formBasicPassword" >
  <Form.Label>Role</Form.Label>
  <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    none
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Supplier</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Admin</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Superuser</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </FormGroup>



  <button variant="primary" type="submit" class="btn btn-primary" onClick = {onSubmit}>
    Create Supplier
  </button>

</Form>
      );
    };

const mapStateToProps = state => {
    return {
        showStartAssessmentModal: state.assessments.showStartAssessmentModal,
        loading_processing: state.assessments.loading_processing,
        loading_start_assessment: state.assessments.loading_start_assessment,
        start_assessment_file: state.assessments.start_assessment_file,
        fileProcessingComplete: state.assessments.fileProcessingComplete,
        userRole: state.auth.role,
        userDetails: state.users.signedInUser,
        startAssessmentComplete: state.assessments.startAssessmentComplete,
        startAssessmentConfirmModal: state.assessments.startAssessmentConfirmModal,
        totalClients: state.assessments.totalClients,
        totalAssessments: state.assessments.totalAssessments,
        errors: state.assessments.errors,
        failedAt: state.assessments.failedAt,
        showUpdateStaffModal: state.users.showUpdateStaffModal,
        showUpdateStaffConfirmModal: state.users.showUpdateStaffConfirmModal,
        updatingStaffComplete: state.users.updatingStaffComplete,
        loadingUpdatingStaff: state.users.loadingUpdatingStaff,
        updateStaffError: state.users.error,
        token: state.auth.token,
        userId: state.auth.userId

    };
}
//can access these function to dispatch actions - via props
const mapDispatchToProps = dispatch => {
    return {
        OnUpdateClientAll: (token, client_id, updated_client, isArchived) => dispatch(actions.updateClientAll(token, client_id, updated_client, isArchived)),
        OnFetchClients: (token, filter, userId, limit, pageNumber) => dispatch(actions.fetchClients(token, filter, userId, limit, pageNumber)),
        OnSetModal: (val) => dispatch(actionsAssessments.setStartAssessmentModal(val)),
        OnStartAssessment: (questionnaire, token, userId) => dispatch(actionsAssessments.startAssessment(questionnaire, token, userId)),
        OnSetProcessingXLSXCSV: (val, fileName, isComplete) => dispatch(actionsAssessments.setProcessingXLSXCSV(val, fileName, isComplete)),
        OnSetStartAssessmentConfirmModal: (val) => dispatch(actionsAssessments.setStartAssessmentConfirmModal(val)),
        OnSetStartAssessmentComplete: (val) => dispatch(actionsAssessments.setStartAssessmentComplete(val)),
        OnSetUpdateStaffModal: (val) => dispatch(actionsUsers.setUpdateStaffModal(val)),
        OnSetUpdateStaffConfirmModal: (val) => dispatch(actionsUsers.setUpdateStaffConfirmModal(val)),
        OnSetUpdatingStaffComplete: (val) => dispatch(actionsUsers.setUpdatingStaffComplete(val)),
        OnUpdateStaffUser: (token, staff_id, updatedStaff) => dispatch(actionsUsers.updateStaff(token, staff_id, updatedStaff)),
        onRegisterStaffUser: (token, name, more_detail) => dispatch(actionsUsers.registerStaffUser(token, name, more_detail))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar)