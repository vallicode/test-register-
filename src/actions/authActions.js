import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken"
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  
  let temp = localStorage.getItem('userDetails')
  let retrievedObject = JSON.parse(temp);
  //console.log(retrievedObject)
  retrievedObject['userDetails'].push(userData)
  localStorage.setItem('userDetails',JSON.stringify(retrievedObject))
   temp = localStorage.getItem('userDetails')
   retrievedObject = JSON.parse(temp);
  console.log(retrievedObject)
  history.push('/login')
};
// Login - get user token
export const loginUser = userData => dispatch => {
  let temp = localStorage.getItem('userDetails')
  let retrievedObject = JSON.parse(temp);
    console.log(userData)
  
  let userEamil = retrievedObject['userDetails'].find(el =>       
     (el.email === userData.email)
      );
      let validUser = retrievedObject['userDetails'].find(el =>       
        (el.password===userData.password && el.email === userData.email )
         );
  if(userEamil) {
       if(validUser){
        const token = jwt.sign({email:userData.email,name:userData.name},"$SeCrEtKey2020$",{expiresIn: 2000})
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
       }else{
        dispatch({
          type: GET_ERRORS,
          payload: {emailnotfound:'Incorrect Password'}
        })
       } 
  }else{
    dispatch({
      type: GET_ERRORS,
      payload: {emailnotfound:'Email Not Found'}
    })

  }
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};