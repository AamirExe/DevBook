import { connect } from 'react-redux'
import React, { Fragment, useEffect } from 'react'
import { getCurrentPofile } from '../../actions.js/profile'
import { Link } from 'react-router-dom'
import DashboardAction from './DashboardAction'
import Experience from './Experience'
import Education from './Education'
import {deleteAccount} from '../../actions.js/profile'
import LoadCircle from '../spinner/spinner'
const Dashboard = ({getCurrentPofile , auth:{user},profile,deleteAccount}) => {
    useEffect(()=>{
        getCurrentPofile();
    },[])

    

    return (
    <Fragment>
        { profile.loading ?  
        <LoadCircle /> :
          <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user' /> Welcome {user && user.name} 
        </p>
        {profile.profile !== null ? <Fragment>
           <DashboardAction />  
           <Experience experience={profile.profile.experience} />
           <Education education={profile.profile.education} />
            <div className='my-2'>
                <button className='btn btn-danger' onClick={()=> deleteAccount()}>
                    <i className='fas fa-user-minus'>
                        Delete My Account
                    </i>
                </button>
            </div>

            </Fragment> :
             <Fragment>
            <p>You have not yet setup a profile ,Please add some info </p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
            </Link>
            </Fragment>}      
               </Fragment>}
        

    </Fragment>)
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentPofile,deleteAccount})(Dashboard) 