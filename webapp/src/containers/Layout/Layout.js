import React from 'react'
import { useLocation } from 'react-router';
import classes from './Layout.module.css';
import SideNavBar from '../../components/UI/SideNavBar/SideNavBar';

const Layout = (props) => {
    let current_location = useLocation().pathname;
    return (
        current_location === "/signin" || current_location.substring(0, 14) === "/registerstaff"?
            <div className={classes.AuthContainer}>
                <main className={classes.ContentSignIn}>{props.children}</main>
            </div>
            : <div className={classes.AppContainer}>
                <SideNavBar />
                <main className={classes.Content}>{props.children}</main>
            </div>
    )
}

export default Layout