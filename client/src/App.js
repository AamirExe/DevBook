
import './App.css';



import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/login'
import SignIn from './components/auth/signIn'
import { Fragment, useEffect } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Alert from './components/layout/alert'
import Dashboard from './components/dashboard/Dashboard'
import EditProfile from './components/profile-forms/EditProfile'
import CreateProfile from './components/profile-forms/CreateProfile'
import AddExperience from './components/profile-forms/addExperience'
import AddEducation from './components/profile-forms/addEducation'
import Profiles from './components/profiles/profiles'
import Profile from './components/profile/profile'
import Posts from './components/posts/Posts'
import SinglePost from './components/post/SinglePost'

// Redux
import {Provider} from 'react-redux'
import store from './store'

import {loadUser} from './actions.js/auth'
import setAuthToken from './helpers/setAuthToken';
import PrivateRouting from './components/routing/PrivateRouting'


if(localStorage.token){
  setAuthToken(localStorage.token)
}




const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
  <Provider store = {store}>
  <Router>
   
   <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <section className='container'>
        <Alert/>
        <Switch>
          <Route exact path='/register' component={SignIn} />
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRouting exact path='/dashboard' component={Dashboard}/>
          <PrivateRouting exact path='/create-profile' component={CreateProfile} />
          <PrivateRouting exact path='/edit-profile' component={EditProfile} /> 
          <PrivateRouting exact path='/add-experience' component={AddExperience} /> 
          <PrivateRouting exact path='/add-education' component={AddEducation} />
          <PrivateRouting exact path='/posts' component={Posts} /> 
          <PrivateRouting exact path='/post/:id' component={SinglePost} />
        </Switch>
      </section>
    
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
