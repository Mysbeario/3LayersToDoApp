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
import TaskForm from "../Admin/TaskManager/TaskForm";
import Axios from "axios";

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
  const [data, setData] = useState<TaskData[]>([]);
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const onRowChange = (
    newData: Omit<TaskData, "id">,
    oldData?: TaskData
  ): void => {
    if (oldData) {
      const updatedData = [...data];
      updatedData[data.indexOf(oldData)] = { ...newData, id: oldData.id };
      setData(updatedData);
    } else setData([{ ...newData, id: data.length + 1 }, ...data]);
  };

  const onAddButtonClick = (): void => {
    setEditData({
      owner: { id: 1, name: "Phan Dung Tri" },
      status: 0,
    });
    setFormAction("create");
    setOpenForm(true);
  };

  const onEditButtonClick = (data: TaskData): void => {
    setFormAction("update");
    setEditData(data);
    setOpenForm(true);
  };

  useEffect(() => {
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
      <AllTasks
        tabIndex={0}
        currentTab={tabIndex}
        data={data}
        onEditClick={onEditButtonClick}
      />
      <Fab color="primary" onClick={onAddButtonClick} className={classes.fab}>
        <AddIcon />
      </Fab>
      <TaskForm
        action={formAction}
        open={openForm}
        onClose={() => setOpenForm(false)}
        onChange={onRowChange}
        editData={editData}
        forAdmin={false}
      />
    </div>
  );
};

export default UserPage;
