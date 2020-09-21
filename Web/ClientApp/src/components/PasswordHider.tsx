import {
  InputAdornment,
  IconButton,
  InputBase,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

interface Props {
  value: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: "#000!important",
    },
  })
);

const PasswordHider = ({ value }: Props): JSX.Element => {
  const classes = useStyles();
  const [showPassword, setPasswordVisibility] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  return (
    <InputBase
      disabled
      className={classes.root}
      type={showPassword ? "text" : "password"}
      value={value}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={(): void => setPasswordVisibility(!showPassword)}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordHider;
