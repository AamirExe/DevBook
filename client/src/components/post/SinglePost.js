
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import {getSinglePost} from '../../actions.js/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import LoadCircle from '../spinner/spinner'

const SinglePost = ({getSinglePost,post:{post,loading},match}) => {
    
    useEffect(() =>{
        getSinglePost(match.params.id)
    },[getSinglePost,match.params.id])
    
    
    return loading || post == null ? (<LoadCircle />):
        <Fragment>
            <PostItem singlePost={false} post={post} />
            <CommentForm postId={post._id}/>
            <div className='comments'>
                {
                    post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} /> 
                    ))
                }

            </div>
        </Fragment> 
}


const mapStateToProps = state => ({
    post:state.post
})

export default connect(mapStateToProps,{getSinglePost})(SinglePost) 