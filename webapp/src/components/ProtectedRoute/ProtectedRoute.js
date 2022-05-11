/* 
    Component created to protect to Routes of the system.
    It protects authenticated routes. In other words, it lets the direct to the route
    if they are authenticated, otherwise they cannot go to that route. 
*/
import React from 'react'
import { Navigate } from 'react-router-dom'

class ProtectedRoute extends React.PureComponent {
    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.isAuthenticated;
        return isAuthenticated ? (
            this.props.path !== "/staff" ? <Component /> : this.props.role === "superuser" || this.props.role === "admin" ? <Component /> : <Navigate to={{ pathname: '/clients'}} />
        ) :   <Navigate to={{ pathname: '/signin'}} />
    }
}


export default ProtectedRoute;