import React,{Fragment} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {removeLike,deletePost} from '../../actions.js/post'
import {addLike} from '../../actions.js/post'

const PostItem = ({post,auth,addLike,removeLike,deletePost,singlePost}) => {

const {
    _id,text,name,avatar,user,likes,comments,date
} = post

    return (
        <div className="posts">
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment> 
            </p>
            {
                singlePost && (
                    <Fragment>
                        <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                            
                            <i className="fas fa-thumbs-up"></i>
                            {" "}
                            <span>{likes.length}</span>
                            </button>
                            <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`post/${_id}`} className="btn btn-primary">
                            Discussion <span className='comment-count'>{comments.length}</span>
                            </Link>
                            {
                            !auth.loading && user === auth.user._id &&(
                            <button      
                            onClick={e => deletePost(_id)}
                            type="button"
                            className="btn btn-danger">
                                
                            <i className="fas fa-times"></i>
                         </button>)
                            }
                    </Fragment>
                )
            }
            
          </div>
        </div>
        </div>
    )
}

PostItem.defaultProps = {
    singlePost:true
}
const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem) 