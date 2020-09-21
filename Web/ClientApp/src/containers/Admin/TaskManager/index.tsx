import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import TableIcons from "../../../components/TableIcons";
import convertDateToString from "../../../utilities/convertDateToString";
import { UserData } from "../UserManager";
import TaskDetails from "./TaskDetails";
import AddTaskForm from "./AddTaskForm";

interface TaskData {
  id: string;
  owner: UserData;
  title: string;
  description: string;
  status: number;
  createdOn: string;
}

const url = "/api/task";

const TaskManager = (): JSX.Element => {
  const [data, setData] = useState<TaskData[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const onRowDelete = (oldData: TaskData): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}${oldData.id}`);
      setData(data.filter((d) => d !== oldData));
    })();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(url);
      setData(data as TaskData[]);
    })();
  }, []);

  return (
    <>
      <MaterialTable
        title="Tasks"
        icons={TableIcons}
        columns={[
          {
            title: "ID",
            field: "id",
            initialEditValue: data.length + 1,
            editable: "never",
          },
          { title: "Title", field: "title" },
          {
            title: "Status",
            field: "status",
            lookup: { 0: "To Do", 1: "Doing", 2: "Done" },
          },
          {
            title: "Owner",
            field: "owner",
            render: (rowData: TaskData) => rowData.owner.name,
          },
          {
            title: "Created On",
            field: "createdOn",
            editable: "never",
            initialEditValue: new Date().toISOString(),
            render: (rowData: TaskData) =>
              convertDateToString(new Date(rowData.createdOn ?? Date.now())),
          },
        ]}
        data={data}
        editable={{ onRowDelete }}
        detailPanel={({ owner, status, ...data }: TaskData) => (
          <TaskDetails {...data} owner={owner.name} />
        )}
        actions={[
          {
            icon: "add",
            tooltip: "Add Task",
            isFreeAction: true,
            onClick: (): void => setOpenForm(true),
          },
        ]}
      />
      <AddTaskForm open={openForm} onClose={(): void => setOpenForm(false)} />
    </>
  );
};

export default TaskManager;
