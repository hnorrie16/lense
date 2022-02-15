/* 
    This container handles logging a user out of the system.
*/
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/auth';

class Logout extends React.Component {

    componentDidMount() {

        this.props.OnLogout();
    }
    //redirecting the user back to the login page
    render() {
        return <Redirect to="/signin" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout)