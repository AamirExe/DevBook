import { connect } from 'react-redux'
import React from 'react'
import { Redirect, Route } from 'react-router'




const PrivateRouting = ({component :Component ,auth,...rest }) => {
    

    return <Route {...rest} render={props => !auth.isAuthenticated && !auth.loading ? (<Redirect to='/login'/>) : (<Component {...props}/>) } />
}


const mapStateToProps= state => ({
    auth:state.auth
});

export default connect(mapStateToProps)(PrivateRouting)