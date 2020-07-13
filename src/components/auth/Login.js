import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},   
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
      console.log(this.state.errors)
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  validation = () => {
    let ele = document.querySelectorAll('.status')
    ele.forEach(element => {
      element.innerHTML = ""
    });
    let status = true;
    if (this.state.email.length < 1) {
      status = false
      document.getElementsByClassName('email-error')[0].innerHTML = "Please enter your eamil"
    }
    if (this.state.password.length < 1) {
      status = false
      document.getElementsByClassName('password-error')[0].innerHTML = "Please enter your password"
    } 
    return status
  }

  onSubmitData = e => {
    e.preventDefault();
    if(this.validation()){
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  //sending as userData as props to authActions
    }
  };
useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
  
  );
  

  
  render() {
    const { errors } = this.state;
    return (
      <div className="content-container">
      
        <Container component="main" maxWidth="xs" style={{marginTop:'120px'}}>
      <CssBaseline />
      <div className={this.useStyles.paper}>
        <Avatar className={this.useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={this.useStyles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            className={classnames("", {
              invalid: errors.email || errors.emailnotfound
            })}
          />
        <span style={{ color: 'red' }} className="email-error status"></span>

                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="password"
            fullWidth
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect
            })}
            autoComplete="current-password"
          />
            <span style={{ color: 'red' }} className="password-error status"></span>

                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>

          <Button style={{marginTop:'15px'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.useStyles.submit}
            onClick={this.onSubmitData}
          >
            Sign In
          </Button>
 
        </form>
      </div>
     
    </Container>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser })(Login);
