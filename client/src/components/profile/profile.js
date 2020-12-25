import React, { Fragment, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfileById} from '../../actions.js/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import LoadCircle from '../spinner/spinner'

const Profile = ({
    getProfileById,
    profile:{profile,loading},
    auth,
    match   
}) => {

    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById])
    
    
    return <Fragment>
        {profile === null || loading ? <LoadCircle />  : <Fragment>
            <Link to='/profiles' className ='btn btn-light'>Bact to Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === match.params.id &&
            (<Link to='/edit-profile' className='btn btn-dark'> Edit Profile</Link>)}     
            <div className='profile-grid my-1' >
             <ProfileTop profile={profile} />         
             <ProfileAbout profile={profile} />
             <div className='profile-exp bg-white p-2'>
                 {
                     profile.experience.length > 0 ?
                     
                      
                      (<Fragment>
                        <h2 className='text-primary' >Experience</h2>
                          {
                    
                        profile.experience.map(exp => <ProfileExperience key={exp._id} experience = {exp} /> )

                        }</Fragment>):
                        (<h4>No Experience Credentials</h4>) 
                          
                 }

             </div>
             <div className='profile-edu bg-white p-2'>
                 {
                     profile.education.length > 0 ?
                      (<Fragment>
                        <h2 className='text-primary' >Education</h2>
                          {
                    
                        profile.education.map(edu => <ProfileEducation key={edu._id} education = {edu} /> )

                        }</Fragment>):
                        (<h4>No Education Credentials</h4>) 
                 }

                

             </div>
             {
                     profile.githubusername && <ProfileGithub username={profile.githubusername} />
                 }

            </div>
            </Fragment>}

    </Fragment>
}


const mapStateToProps = (state) => ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
