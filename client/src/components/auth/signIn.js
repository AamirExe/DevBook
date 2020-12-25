import React, { Fragment ,useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import {setAlert} from '../../actions.js/alert'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../../actions.js/auth'


const SignIn = (props) => {
    const [formData ,setformData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    }
    );
    const {setAlert,register} = props
    const {name,email,password,password2}= formData;
    const onChange = e => setformData({...formData,[e.target.name]:e.target.value})
    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Password doesnt match','danger')
        }else{
            register({name,email,password})
        }
    }

if(props.isAuthenticated){
  return <Redirect to='/dashboard'/>
}

    return(
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name"
           name="name"
            value={name} 
            onChange={e => onChange(e)} 
             />
        </div>
        <div className="form-group">
          <input type="email"
           placeholder="Email Address"
            name="email" 
            value={email} 
            onChange={e => onChange(e)}
            />
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
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={e => onChange(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
  })


export default connect(mapStateToProps,{setAlert,register})( SignIn)