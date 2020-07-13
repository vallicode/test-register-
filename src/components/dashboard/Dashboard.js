import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode'
import Button from '@material-ui/core/Button';

import { logoutUser } from "../../actions/authActions";
import RegisterDetailsForm from  "../RegisterDetailsForm/"
class Dashboard extends Component {

  constructor(){
    super();
    this.state={
      user:''
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
componentDidMount(){
  let token=localStorage.getItem('jwtToken');
  let decoded = jwt_decode(token);
  this.setState({
    user:decoded.email
  })
}
render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="content-container valign-wrapper">
        <div className="row">
          <div style={{display:'flex',justifyContent:'space-around',}}>
            <h1>
              Hey there,{this.state.user.split('@')[0]}    
            </h1>
            <Button style={{marginTop:'15px',width:'150px',height:'35px'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onLogoutClick}
          >
            Logout
          </Button>
          </div>

            <RegisterDetailsForm />
         
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
