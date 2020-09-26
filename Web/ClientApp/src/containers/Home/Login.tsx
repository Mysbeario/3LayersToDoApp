import {
  makeStyles,
  Avatar,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import getAccountInfo from "../../utilities/getAccountInfo";
import { accountState } from "../state";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface LoginInfo {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<LoginInfo>();
  const [openAlert, setOpenAlert] = useState(false);
  const setAccountState = useSetRecoilState(accountState);

  const login = async (loginInfo: LoginInfo): Promise<void> => {
    try {
      await Axios.post("/api/auth/login", loginInfo);
      setAccountState(getAccountInfo());
    } catch (e) {
      setOpenAlert(true);
    }
  };

  return (
    <div className={classes.paper}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="error">Login failed!</Alert>
      </Snackbar>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <form className={classes.form} onSubmit={handleSubmit(login)}>
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
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
