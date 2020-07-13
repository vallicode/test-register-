
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
class signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }



  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  validation = () => {
    let ele = document.querySelectorAll('.status')
    ele.forEach(element => {
      element.innerHTML = ""
    });
    let status = true;

    if (this.state.email.length < 1) {
      status = false
      document.getElementsByClassName('email-error')[0].innerHTML = "Please enter your email"
    }
    else {
      let lastAtPos = this.state.email.lastIndexOf('@')
      let lastDotPos = this.state.email.lastIndexOf('.')
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1
        && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        status = false;
        document.getElementsByClassName('email-error')[0].innerHTML = "Please enter a valid email";
      }
    }
    if (this.state.name.length < 1) {
      status = false
      document.getElementsByClassName('username-error')[0].innerHTML = "Please enter your username"
    }
    if (this.state.password.length < 1) {
      status = false
      document.getElementsByClassName('password-error')[0].innerHTML = "Please enter your password"
    } else {
      if (this.state.password.length < 8) {
        status = false
        document.getElementsByClassName('password-error')[0].innerHTML = "Your password must be at least 8 characters"
      }
      if (this.state.password.search(/[a-z]/i) < 0) {
        status = false
        document.getElementsByClassName('password-error')[0].innerHTML = "Your password must contain at least one letter."
      }
      if (this.state.password.search(/[0-9]/) < 0) {
        status = false
        document.getElementsByClassName('password-error')[0].innerHTML = "Your password must contain at least one digit."
      }
      if (/^[A-Za-z0-9 ]+$/.test(this.state.password)) {
        status = false
        document.getElementsByClassName('password-error')[0].innerHTML = "Your password must contain at least one special character"
      }
    }
    if (this.state.password2.length < 1) {
      status = false
      document.getElementsByClassName('confirm-password-error')[0].innerHTML = "Please re-enter your password"
    }

    if (this.state.password != this.state.password2) {
      status = false
      document.getElementsByClassName('confirm-password-error')[0].innerHTML = "Password do not match";
    }
    return status
  }


onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {  
  e.preventDefault();
  if (this.validation()) {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history); 
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  


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
          Sign up
        </Typography>
        <form className={this.useStyles.form} style={{marginTop:'15px'}} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth               
                label="UserName"
                autoFocus
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
            </Grid>
            <span style={{ color: 'red' }} className="username-error status"></span>

            <span className="red-text">{errors.name}</span>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
               
                label="Email Address"
                onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                autoComplete="email"
              />
            </Grid>
            <span style={{ color: 'red' }} className="email-error status"></span>
            <span className="red-text">{errors.email}</span>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
              />
            </Grid>
            <span style={{ color: 'red' }} className="password-error status"></span>

            <span className="red-text">{errors.password}</span>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Retype password"           
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
        
            </Grid>
            <span style={{ color: 'red' }} className="confirm-password-error status"></span>

            <span className="red-text">{errors.password2}</span>
          </Grid>
          <Button style={{marginTop:'15px'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.useStyles.submit}
            onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" style={{marginTop:'15px'}}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
      </div>
    );
  }
}
signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(signup));