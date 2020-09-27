import {
  AppBar,
  createStyles,
  Fab,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AllTasks from "./AllTasks";
import { Add as AddIcon } from "@material-ui/icons";
import { TaskData } from "../Admin/TaskManager";
import TaskForm from "../../components/TaskForm";
import Axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, taskState } from "../state";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const UserPage = (): JSX.Element => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Partial<TaskData>>();
  const [data, setData] = useRecoilState(taskState);
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
    if (!account.id) history.push("/");

    (async () => {
      const { data } = await Axios.get("/api/task");
      setData(data);
    })();
  }, []);

  return (
    <div>
      <AppBar position="sticky">
        <Tabs
          value={tabIndex}
          onChange={(_, newValue: number) => setTabIndex(newValue)}
          centered
        >
          <Tab label="All Tasks" />
          <Tab label="Your Tasks" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <AllTasks data={data} onEditClick={onEditButtonClick} />
      )}
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
