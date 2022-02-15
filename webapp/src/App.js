import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from './containers/Layout/Layout'
import Clients from './containers/Clients/Clients'
import SeriesOne from './containers/Series/SeriesOne'
import SeriesTwo from './containers/Series/SeriesTwo'
import SeriesFour from './containers/Series/SeriesFour'
import SeriesFive from './containers/Series/SeriesFive'
import SeriesSix from './containers/Series/SeriesSix'
import SeriesSeven from './containers/Series/SeriesSeven'
import SeriesEight from './containers/Series/SeriesEight'
import StaffTable from './containers/Series/StaffTable'
import InactiveTable from './containers/Series/InactiveTable'
import MasterTable from './containers/Series/MasterTable'
import Export from './containers/Series/Export'
import Auth from './containers/Auth/Auth'
import Staff from './containers/Staff/Staff'
import Assessment from './containers/Assessment/Assessment'
import ClientProfile from './containers/ClientProfile/ClientProfile'
import Logout from './containers/Auth/Logout/Logout'
import StaffPasswordChange from './containers/StaffPasswordChange/StaffPasswordChange'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import * as actions from './store/actions/auth';
import { connect } from 'react-redux'

const App = (props) => {

  // calls the checkAuthState whenever the page refreshes
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props.onTryAutoSignup]);

  return (
    <Layout>
      <Switch>
        <Route path="/signin" exact={true} component={Auth} />
        <Redirect exact from="/" to="/signin" />
        <Route path="/registerstaff/changepassword" component={StaffPasswordChange} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/clients' component={Clients} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriesone' component={SeriesOne} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriestwo' component={SeriesTwo} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriesfour' component={SeriesFour} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriesfive' component={SeriesFive} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriessix' component={SeriesSix} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/seriesseven' component={SeriesSeven} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/serieseight' component={SeriesEight} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/exporttable' component={Export} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/mastertable' component={MasterTable} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/assessmentpanel/:id' component={Assessment} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/clientprofile/:id' component={ClientProfile} />
        <ProtectedRoute exact={true} isAuthenticated={props.isAuthenticated} path='/stafftable' component={StaffTable} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
