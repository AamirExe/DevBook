import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../../actions.js/auth'




const Navbar = ( {auth: {isAuthenticated,loading},logout}) => {
  
  
  const authLinks =(
    <ul>
      
      <li><Link to="/Dashboard">
        <i className='fas fa-user' /> {''}
        <span className='hide-sm'> Dashboard</span></Link>
        </li>
      
      <li>
        <Link  onClick={logout} to='#!'>
          <i className='fas fa-sign-out-alt'> <span className='hide-sm'> Logout </span>  </i></Link>
      </li>

      <li><Link to="/profiles">
        <i className='fas fa-user' /> {''}
        <span className='hide-sm'> Developers</span></Link>
        </li>
      
      
        <li><Link to="/posts">
        <i className='fas fa-user' /> {''}
        <span className='hide-sm'> Posts</span></Link>
        </li>
    </ul>
  )


  const guestLink=(
    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      
        
      
      </ul>
  )
  
  return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-code"></i> DevBook</a>
            </h1>
        {!loading && (<Fragment>{isAuthenticated ? authLinks:guestLink}</Fragment>)}      
    </nav>
    )
}

const mapStateToProps = state =>({
  auth : state.auth
})


export default connect(mapStateToProps,{logout})(Navbar) 