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
import {
  HourglassEmpty as DoingIcon,
  ListAlt as AllIcon,
  CheckCircle as DoneIcon,
  TimerOff as OverdueIcon,
  EventNote as TodayIcon,
  Timer as WillBeExpiredIcon,
} from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { taskFilterState } from "../state";

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const FilterMenu = (): JSX.Element => {
  const classes = useStyles();
  const [filter, setFilter] = useRecoilState(taskFilterState);

  return (
    <Grid item xs={2}>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Filter</ListSubheader>}
        className={classes.list}
      >
        <ListItem
          button
          selected={filter === "all"}
          onClick={() => setFilter("all")}
        >
          <ListItemIcon>
            <AllIcon />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
        <ListItem
          button
          selected={filter === "today"}
          onClick={() => setFilter("today")}
        >
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>
        <ListItem
          button
          selected={filter === "doing"}
          onClick={() => setFilter("doing")}
        >
          <ListItemIcon>
            <DoingIcon />
          </ListItemIcon>
          <ListItemText primary="Doing" />
        </ListItem>
        <ListItem
          button
          selected={filter === "done"}
          onClick={() => setFilter("done")}
        >
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary="Done" />
        </ListItem>
        <ListItem
          button
          selected={filter === "will be expired"}
          onClick={() => setFilter("will be expired")}
        >
          <ListItemIcon>
            <WillBeExpiredIcon />
          </ListItemIcon>
          <ListItemText primary="Expired Soon" />
        </ListItem>
        <ListItem
          button
          selected={filter === "overdue"}
          onClick={() => setFilter("overdue")}
        >
          <ListItemIcon>
            <OverdueIcon />
          </ListItemIcon>
          <ListItemText primary="Overdue" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default FilterMenu;
