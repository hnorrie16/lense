import React, { useEffect } from 'react'
import { Route, Routes, Navigate, Switch, Router, BrowserRouter} from "react-router-dom";
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
import AboutYou from './components/QuestionnaireForms/AboutYou/AboutYou';
import SeriesContactLense from './containers/Series/SeriesContactLense';

const App = (props) => {

  // calls the checkAuthState whenever the page refreshes
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props.onTryAutoSignup]);

  return (
<Layout>
<Routes>
      <Route path="/signin" element={<Auth />}></Route>
      <Route path="/" element={<Navigate replace to="/signin" />} />
      <Route name = "master" path="/master" element={<MasterTable />} />
      <Route name = "seriessix" path="/seriessix" element={<SeriesSix/>} />
      <Route name = "seriesseven" path="/seriesseven" element={<SeriesSeven/>} />
      <Route name = "seriescontactlense" path="/seriescontactlense" element={<SeriesContactLense/>} />
      <Route path="/staff" element={<StaffTable/>}/>
      <Route name="logout" path="/logout" element={<Logout/>} />
</Routes>
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
