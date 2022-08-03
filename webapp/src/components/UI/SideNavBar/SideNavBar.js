import React, { useState, useEffect, componentDidMount  } from 'react'
import { Modal, Form, Dropdown, DropdownButton, Spinner, Nav, ButtonGroup} from "react-bootstrap";
import classes from './SideNavBar.module.css'
import looks from '../NavItem/NavItem.module.css'
import NavItem from '../NavItem/NavItem'
import Logo from '../../../Assets/Images/Sleep Science Logo File.png'
import * as actionsAssessments from '../../../store/actions/assessments'
import * as actionsUsers from '../../../store/actions/users'
import { connect } from 'react-redux';
import OutsideAlerter from '../../OutsideAlerter/OutsideAlerter'
import { NavLink, useNavigate, Link, Navigate } from 'react-router-dom'
import Button from '../Button/Button'
import { FormGroup, Icon, TextareaAutosize } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import classess from '../NavItem/NavItem.module.css'
import * as actions from '../../../store/actions/clients';
import navItem from '../NavItem/NavItem';

const SideNavBar = (props) => {
  
  
    const [showDropDown, setShowDropDown] = useState(false);
    const history = useNavigate();
    const role = (props.userRole)

    const [show, setShow] = useState(false);

    let navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    var dict = {};
    dict["STOCK Single Vision - Add to 71BS001"] = 1;
    dict["SURFACED Single Vision - Add to 72BS001"] = 2;
    dict["Bi/Trifocals (Add to 74BS001)"] = 4;
    dict["Varifocal Distance/Near (Add to 76BS001)"] = 6;
    dict["Add-Ons - Coatings"] = 7;
    dict["Add-Ons - Tints"] = 8;
    dict["Add-Ons - Other"] = 9;


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
        navigate("/logout", { replace: true })
        navigate(0)
    }

    const dropdown = (
        <OutsideAlerter setShowDropDown={setShowDropDown} show={showDropDown}>
            {showDropDown &&
                <ul className={classes.DropDownContainer}>
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

                

<hr></hr>
                {props.userRole == 'superuser' || props.userRole == 'supplier'?                 
    < DropdownButton className={classess.NavItem} title="Glass Lenses">
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 0}}>All lenses</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 1}}  >STOCK Single Vision</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 2}} >SURFACED Single Vision</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 4}}>Bi/Trifocals</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 6}}>Varifocal Distance/Near</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 7}}>Add-Ons - Coatings</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 8}}>Add-Ons - Tints</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriesseven" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 9}}>Add-Ons - Other</Link></Dropdown.Item>
</DropdownButton>: null }

{props.userRole == 'superuser' || props.userRole == 'supplier'? <Dropdown className={classess.NavItem}>
  <Dropdown.Toggle>
    Plastic lenses
  </Dropdown.Toggle>
  <Dropdown.Menu >
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 0}}>All lenses</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 1}}>STOCK Single Vision</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 2}}>SURFACED Single Vision</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 3}}>Accomodative Support Lenses</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 4}}>Bi/Trifocals</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 5}}>Varifocal Intermediate/Near</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 6}}>Varifocal Distance/Near</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 7}}>Add-Ons - Coatings</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 8}}>Add-Ons - Tints</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="seriessix" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 9}}>Add-Ons - Other</Link></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>: null }

{props.userRole == 'superuser' || props.userRole == 'supplier'? <Dropdown className={classess.NavItem}>
  <Dropdown.Toggle>
    Contact Lenses
  </Dropdown.Toggle>
  <Dropdown.Menu >
    <Dropdown.Item ><Link to="seriescontactlense" state={{supplierchild: props.userDetails.supplierchild, lenseIdFilter: 0}}>All Lenses</Link></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>: null }



                {props.userRole == 'superuser'? <NavItem link={"/master"} supplierchild={props.userDetails.company} >Master</NavItem>: null }
                {props.userRole == 'superuser' ? <NavItem link={"/staff"}supplierchild={props.userDetails.supplierchild} >Staff</NavItem>: null }


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