import {
  makeStyles,
  Avatar,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { AssignmentInd as AssignmentIndIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

const Register = (): JSX.Element => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<RegisterInfo>();
  const [openAlert, setOpenAlert] = useState(0);

  const createAccount = async (registerInfo: RegisterInfo): Promise<void> => {
    try {
      await Axios.post("/api/user", registerInfo);
      setOpenAlert(2);
    } catch (e) {
      setOpenAlert(1);
    }
  };

  return (
    <div className={classes.paper}>
      <Snackbar
        open={openAlert === 1}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(0)}
      >
        <Alert severity="error">Register failed!</Alert>
      </Snackbar>
      <Snackbar
        open={openAlert === 2}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(0)}
      >
        <Alert severity="error">
          Account created! You can login to your account now!
        </Alert>
      </Snackbar>
      <Avatar className={classes.avatar}>
        <AssignmentIndIcon />
      </Avatar>
      <form className={classes.form} onSubmit={handleSubmit(createAccount)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Full Name"
          name="name"
          inputRef={register({ required: true })}
          error={!!errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          inputRef={register({ required: true })}
          error={!!errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          inputRef={register({ required: true })}
          error={!!errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
