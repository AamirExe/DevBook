
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import {getPost} from '../../actions.js/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
import LoadCircle from '../spinner/spinner'
const Posts = ({getPost,post:{posts,loading}}) => {

    useEffect(()=>{
        getPost()
    },[getPost])


    return (
    <div>
        {loading ?
         <LoadCircle />:
         <Fragment>
            <h1 className='large text-primary'> Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the community
            </p>
            <PostForm  />
            <div className='posts'>
            {posts.map(post => <PostItem key={post._id} post={post}/>)} 
            </div>
             
             
             </Fragment>}
    </div>)
    

}


const mapStateToProps = (state) =>({
    post : state.post
})


export default connect(mapStateToProps,{getPost})(Posts)