import React, { useContext, Fragment } from "react";
import { UserContext } from "./UserContext";
import { makeStyles } from "@material-ui/core/styles";

//GENERAL
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
  }
}));
// SUMMARY COMPONENT
export default props => {
  const classes = useStyles();
  const [state] = useContext(UserContext);
  const { username, email, birthdate, phone, Address } = state.user;
  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12}>
          <Typography variant='h4'>Summary</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6'>Username</Typography>
          <Typography variant='body2'>{username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Email</Typography>
          <Typography variant='body2'>{email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Birthdate</Typography>
          <Typography variant='body2'>{birthdate}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Phonenumber</Typography>
          <Typography variant='body2'>{phone || "-"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Address</Typography>
          <Typography variant='body2'>{Address || "-"}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.acceptTerms}
                required
                color='primary'
                name='acceptTerms'
              />
            }
            label='I accept terms and conditions'
          />
        </Grid>
      </Grid>
    </Fragment>  
  );
};
