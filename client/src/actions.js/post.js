import axios from 'axios'
import {setAlert} from './alert'
import {
    GET_POST,
    ADD_POST,   
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    GET_SINGLE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './actions'


// Get ALl post 
export const getPost = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type:GET_POST,
           payload:res.data
        })
        
    } catch (err) {
        
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}


// Add Like 


export const addLike = post_id => async dispatch => {
    try {
        console.log(post_id)
        const res = await axios.put(`/api/posts/likes/${post_id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id:post_id,likes:res.data}
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}


// Remove Like 
export const removeLike = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlikes/${post_id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id:post_id,likes:res.data}
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}


// Delete Post 
export const deletePost = post_id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}`)
        dispatch({
            type:DELETE_POST,
            payload:{id:post_id}
        })
        dispatch(setAlert('Post removed','success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

export const addPost = formData => async dispatch => {
    try {
        
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const body = JSON.stringify(formData)
        const res = await axios.post(`/api/posts`,body,config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

// GET SINGLE POST 
export const getSinglePost = (id) => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type:GET_SINGLE_POST,
           payload:res.data
        })
        
    } catch (err) {
        
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

// Add commend 

export const addComment = (postId , formData) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        console.log(formData)

        const body = JSON.stringify(formData)
        const res = await axios.post(`/api/posts/comments/${postId}`,body,config)
        
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })

        dispatch(setAlert('Comment Added','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

// Remove Comment 

export const removeComment = (postId,commentId) => async dispatch => {
    try {
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        
        const res = await axios.delete(`/api/posts/comments/${postId}/${commentId}`,config)
        
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })

        dispatch(setAlert('Comment Removed','success'))


    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}    

