/* 
    This component displays the navigation items for the NavBar component
*/
import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import classes from './NavItem.module.css'


const navItem = (props) => (
    
    <li className={classes.NavItem} >        
        {/* On click, it directs the user to the link passed by props */}
        <NavLink
            to={props.link }
            state= {{supplierchild: props.supplierchild}}>
            {props.children}
        </NavLink>
       




{/* <Link activeClassName="active" to={props.link} state={{supp: "hi prop!"}}></Link> */}
    </li >
    
)

export default navItem;