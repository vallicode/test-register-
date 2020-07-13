import React, { useContext } from "react";
import { UserContext } from "./UserContext";

//GENERAL
import { TextField, Grid } from "@material-ui/core";

//USER PREFERENCES
export default props => {
  const [state] = useContext(UserContext);
  const { user } = state;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id='phone'
          label='phone'
          value={user.phone}
          name='phone'
          placeholder='Type your Phonenumber'
          variant='outlined'
          margin='normal'
          multiline
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            maxLength: 200
          }}
          fullWidth
          rows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id='Address'
          label='Address'
          name='Address'
          type='Address'
          value={user.Address}
          placeholder='Type your Address'
          helperText='Premenant Address'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};