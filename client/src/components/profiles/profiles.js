import React, { Fragment, useEffect } from 'react'

import {connect} from 'react-redux'
import { CLEAR_PROFILE } from '../../actions.js/actions'
import {getProfiles} from '../../actions.js/profile'
import ProfileItem from '../profiles/profileItem'
import LoadCircle from '../spinner/spinner'



const Profiles =({getProfiles,profile:{profiles,loading}}) => {
   
    useEffect(()=> {
        getProfiles();
       
    },[getProfiles])
   

        

    return <Fragment>
        {loading ?    
        <LoadCircle />:
            <Fragment>
                <h1 className='large text-primary'> Developers </h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'></i> Browse and connect with developers
                </p>
                <div className='profiles'>
                    {profiles.length > 0?(
                        profiles.map(profile => (
                         <ProfileItem key={profile.id} profile={profile} />)))
                    : <LoadCircle />}
                </div>
            </Fragment>
            
        }
    </Fragment>

}

const mapStateToProps = (state) => ({
    profile : state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles) 