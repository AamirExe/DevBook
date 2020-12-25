import React from 'react'

import axios from 'axios'

import {
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,GET_PROFILES,GET_REPOS
} from './actions'
import { setAlert } from './alert'

    
export const getCurrentPofile = () => async dispatch =>  {
    dispatch({type:CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile/me')       
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })        
    }

}



// Get all profile 

export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
        dispatch({
            type:CLEAR_PROFILE
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })
    }
}

// Get profile by ID 
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })
    }
}

// Get gitHub repos
export const getGithub = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })
    }
}





// Create Profile 
export const createProfile = (formData,history,edit) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const body = JSON.stringify(formData)

        const res = await axios.post('/api/profile', body,config)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })        

        dispatch(setAlert(edit ? 'Profile Updated':'Profile Created' , 'success'))
        
        if(!edit){
            history.push('/dashboard')
        }
       
        
    } catch (err) {
        
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })       
    }
}

// Add experience 

export const addExperience = (formData,history ) => async dispatch => {

    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const body = JSON.stringify(formData)

        const res = await axios.put('/api/profile/experience', body,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })        

        dispatch(setAlert('Experience Updated' , 'success'))
          history.push('/dashboard')
        
       
        
    } catch (err) {
        
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })       
    }

}


// Add education 

export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const body = JSON.stringify(formData)

        const res = await axios.put('/api/profile/education', body,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })        

        dispatch(setAlert('Education Updated' , 'success'))
          history.push('/dashboard')
        
       
        
    } catch (err) {
        
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })       
    }
}


// Delete Experience 

export const deleteExperience = id => async dispatch =>  {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed' , 'dangers'))

    } catch (err) {
           
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })       
    }
}

// Delete Education 

export const deleteEducation = id => async dispatch =>  {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed' , 'dangers'))

    } catch (err) {
           
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText,status:err.response.status}
        })       
    }
}


// Delete account and profile


export const deleteAccount =() => async dispatch =>  {
    if(window.confirm('Are you sure ? This cant be undone')) {
        try {
            const resp = await axios.delete(`/api/profile`)
            dispatch({type:CLEAR_PROFILE})
            dispatch({type:DELETE_ACCOUNT})
            dispatch(setAlert('Account Removed' , 'dangers'))
            dispatch(setAlert('Your account has been deleted permenently' , 'dangers'))
    
        } catch (err) {
               
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: err.response.statusText,status:err.response.status}
            })       
        }
    }
    
    }
    

    
    