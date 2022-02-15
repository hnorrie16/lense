/* 
    This component displays the navigation items for the NavBar component
*/
import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css'


const navItem = (props) => (
    

  
    
    <li className={classes.NavItem} >
        {/* On click, it directs the user to the link passed by props */}
        <NavLink
           // to={props.link}
           to={{
            pathname: props.link,
            state: {supplierchild: props.supplierchild},
            }}
            exact={props.exact}
            activeClassName={classes.active}

 
        >
            {props.children}
        </NavLink>
    </li >
)

export default navItem;