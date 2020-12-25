import React, { Fragment ,useState} from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {login} from '../../actions.js/auth'

const Login = ({login,isAuthenticated}) => {
    const [formData ,setformData] = useState({
       
        email:'',
        password:''
        
    }
    );

    const {email,password}= formData;
    const onChange = e => setformData({...formData,[e.target.name]:e.target.value})
    const onSubmit = e => {
        e.preventDefault();
        login(email,password)
    }

    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }


    return(
        <Fragment>
            <h1 className="large text-primary">Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Login in with your account</p>
      <form className="form" action="create-profile.html" onSubmit={e=> onSubmit(e)}>
        
        <div className="form-group">
          <input type="email"
           placeholder="Email Address"
            name="email" 
            value={email} 
            onChange={e => onChange(e)}
            required/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={e => onChange(e)}
            required
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="register.html">Sign In</Link>
      </p>
        </Fragment>
    )
}

  const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
  })

    export default connect(mapStateToProps,{login})(Login) 