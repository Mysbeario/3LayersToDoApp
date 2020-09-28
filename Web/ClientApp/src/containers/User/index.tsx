import {
  AppBar,
  createStyles,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { Add as AddIcon } from "@material-ui/icons";
import { TaskData } from "../Admin/TaskManager";
import TaskForm from "../../components/TaskForm";
import Axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  filterTaskState,
  isOnlyMineState,
  taskState,
} from "../state";
import { useHistory } from "react-router-dom";
import FilterMenu from "./FilterMenu";
import AppBarAction from "../../components/AppBarAction";

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    tabs: {
      flexGrow: 1,
    },
  })
);

const UserPage = (): JSX.Element => {
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Partial<TaskData>>();
  const [isOnlyMine, setIsOnlyMine] = useRecoilState(isOnlyMineState);
  const setTaskList = useSetRecoilState(taskState);
  const taskList = useRecoilValue(filterTaskState);
  const account = useRecoilValue(accountState);
  const [formAction, setFormAction] = useState<"create" | "update">("create");
  const history = useHistory();

  const onAddButtonClick = (): void => {
    setEditData({
      owner: { ...account },
      status: 0,
    });
    setFormAction("create");
    setOpenForm(true);
  };

  const onEditButtonClick = (data: TaskData): void => {
    setFormAction("update");
    setEditData({
      ...data,
      startDate: data.startDate.substring(0, 10),
      endDate: data.endDate.substring(0, 10),
    });
    setOpenForm(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/api/task");
      setTaskList(data);
    })();
  }, []);

  useEffect(() => {
    if (!account.id) history.push("/");
  }, [account]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Welcome, {account.name}</Typography>
          <Tabs
            className={classes.tabs}
            value={isOnlyMine}
            onChange={(_, newValue: number) => setIsOnlyMine(newValue)}
            centered
          >
            <Tab label="All Tasks" />
            <Tab label="Your Tasks" />
          </Tabs>
          <AppBarAction />
        </Toolbar>
      </AppBar>
      <Grid container>
        <FilterMenu />
        <Grid item xs={10}>
          <Tasks data={taskList} onEditClick={onEditButtonClick} />
        </Grid>
      </Grid>
      <Fab color="primary" onClick={onAddButtonClick} className={classes.fab}>
        <AddIcon />
      </Fab>
      <TaskForm
        action={formAction}
        open={openForm}
        onClose={() => setOpenForm(false)}
        editData={editData}
        forAdmin={false}
      />
    </div>
  );
};

export default UserPage;
