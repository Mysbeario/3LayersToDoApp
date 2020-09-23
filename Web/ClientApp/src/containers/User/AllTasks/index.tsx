import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import TaskCard from "../../../components/TaskCard";
import { TaskData } from "../../Admin/TaskManager";

interface Props {
  tabIndex: number;
  currentTab: number;
  data: TaskData[];
  onEditClick: (task: TaskData) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      padding: "1rem",
      gridGap: "2rem",
      gridTemplateColumns: "repeat(3, 1fr)",
      background: "#fff",
    },
  })
);

const AllTasks = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.tabIndex === props.currentTab &&
        props.data.map((t) => (
          <TaskCard data={t} onEditClick={props.onEditClick} />
        ))}
    </div>
  );
};

export default AllTasks;
