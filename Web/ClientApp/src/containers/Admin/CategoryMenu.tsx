import React from "react";
import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { Face as FaceIcon, ListAlt as ListAltIcon } from "@material-ui/icons";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CategoryMenu = (): JSX.Element => {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Grid item xs={2}>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Category</ListSubheader>}
        className={classes.list}
      >
        <Link to={`${url}/user`}>
          <ListItem button>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to={`${url}/task`}>
          <ListItem button>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
        </Link>
      </List>
    </Grid>
  );
};

export default CategoryMenu;
