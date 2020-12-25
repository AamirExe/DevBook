import React from 'react'
import {
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_SINGLE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions.js/actions'

const initialState = {
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function (state=initialState,action) {
    const {type,payload} = action

    switch (type) {
        case ADD_POST:
            return{
                ...state,
                loading:false,
                posts:[...state.posts,payload]
            }
        case GET_POST:
            return{
                ...state,
                posts:payload,
                loading:false
            }
        case GET_SINGLE_POST:
            return{
                ...state,
                post:payload,
                loading:false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                posts:state.posts.map(post => post._id === payload.id ? {...post,likes:payload.likes} :post),
                loadig:false
            }
        
        case ADD_COMMENT:
            return{
                ...state,
                post:{...state.post,comments:payload},
                loading:false
            }
        case REMOVE_COMMENT:
            return{
                ...state,
                post:{
                    ...state.post,
                    comments:state.post.comments.filter(cmnt => cmnt._id !== payload )
                },
                loading:false
            }

        
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload.id),
                loading:false
            }


        case POST_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
    
        default:
            return{
                ...state,
                loading:false
            }
            
    }
}