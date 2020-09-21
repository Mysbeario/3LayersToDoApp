import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import CategoryMenu from "./CategoryMenu";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import UserManager from "./UserManager";
import TaskManager from "./TaskManager";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "1rem",
    },
  })
);

const Admin = (): JSX.Element => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Administrator</Typography>
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
