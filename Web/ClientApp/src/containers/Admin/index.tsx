import React, { lazy, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import CategoryMenu from "./CategoryMenu";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accountState } from "../state";
import AppBarAction from "../../components/AppBarAction";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "1rem",
    },
  })
);

const UserManager = lazy(() => import("./UserManager"));
const TaskManager = lazy(() => import("./TaskManager"));

const Admin = (): JSX.Element => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const account = useRecoilValue(accountState);
  const history = useHistory();

  useEffect(() => {
    if (!account.id) history.push("/");
    else if (!account.role) history.push("/user");
  }, [account]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            Administrator
          </Typography>
          <AppBarAction />
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <CategoryMenu />
        <Grid item xs={10}>
          <Switch>
            <Route exact path={path}>
              <h3>Please select a topic.</h3>
            </Route>
            <Route exact path={`${path}/user`}>
              <UserManager />
            </Route>
            <Route exact path={`${path}/task`}>
              <TaskManager />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
