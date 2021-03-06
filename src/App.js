import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import register from "./components/auth/register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from './components/NavigationBar/navigationDrawer'
import './App.css'
require("dotenv").config();
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {

   componentDidMount(){
    let  userDetails = {userDetails:[]};
 if(localStorage.getItem('userDetails') === null 
 || localStorage.getItem('userDetails') === 'undefined'){
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
 }else{
   console.log('userdetails item already exist')
 }
    
   }


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
         
            <Route exact path="/register" component={register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
