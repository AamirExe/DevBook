import {REGISTER_SUCCESS,REGISTER_FAILURE,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT, DELETE_ACCOUNT} from '../actions.js/actions'


const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated : null,
    loading:true,
    user:null
}


export default function (state=initialState,action) {
const {type,payload} = action

switch (type) {

    case LOGIN_SUCCESS:
        localStorage.setItem('token',payload.token)
        return {
            ...state,   
            ...payload,
            isAuthenticated : true,
            loading:false
            
        }

    case LOGIN_FAILURE:
        localStorage.removeItem('token')
        return{
            ...state,
            isAuthenticated:false,
            loading:false,
            token:null
        }
        
        

    case USER_LOADED:
        return{
            ...state,
            isAuthenticated: true,
            loading:false,
            user:payload
        }

    case REGISTER_SUCCESS:
        
        localStorage.setItem('token',payload.token)
        return {
            ...state,
            ...payload,
            isAuthenticated : true,
            loading:false
            
        }
    case REGISTER_FAILURE:
    case LOGOUT:
    case DELETE_ACCOUNT:
        localStorage.removeItem('token')
        return{
            ...state,
            isAuthenticated:false,
            loading:false,
            token:null
        }
    
    case AUTH_ERROR:
        localStorage.removeItem('token')
        return{
            ...state,
            isAuthenticated:false,
            loading:false,
            token:null
        }

    default:
        return state
}

}