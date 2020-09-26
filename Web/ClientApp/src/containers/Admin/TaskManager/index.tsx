import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import TableIcons from "../../../components/TableIcons";
import convertDateToString from "../../../utilities/convertDateToString";
import TaskDetails from "./TaskDetails";
import TaskForm from "./TaskForm";
import { Add as AddIcon, Edit as EditIcon } from "@material-ui/icons";

interface UserInfo {
  id: number;
  name: string;
}

interface TaskData {
  id: number;
  owner: UserInfo;
  title: string;
  description: string;
  status: number;
  startDate: string;
  endDate: string;
}

const url = "/api/task";

const TaskManager = (): JSX.Element => {
  const [data, setData] = useState<TaskData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [rowData, setRowData] = useState<TaskData>();
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const onRowChange = (newData: TaskData, oldData?: TaskData): void => {
    if (oldData) {
      const updatedData = [...data];
      updatedData[data.indexOf(oldData)] = { ...newData, id: oldData.id };
      setData(updatedData);
    } else setData([...data, { ...newData }]);
  };

  const onRowDelete = (oldData: TaskData): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}/${oldData.id}`);
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
            editable: "never",
          },
          { title: "Title", field: "title" },
          {
            title: "Status",
            field: "status",
            lookup: { 0: "Doing", 1: "Done" },
          },
          {
            title: "Owner",
            field: "owner",
            render: (rowData: TaskData) => rowData.owner.name,
          },
          {
            title: "Start Date",
            field: "startDate",
            initialEditValue: new Date().toISOString(),
            render: (rowData: TaskData) =>
              convertDateToString(new Date(rowData.startDate ?? Date.now())),
          },
          {
            title: "End Date",
            field: "endDate",
            initialEditValue: new Date().toISOString(),
            render: (rowData: TaskData) =>
              convertDateToString(new Date(rowData.endDate ?? Date.now())),
          },
        ]}
        data={data}
        editable={{ onRowDelete }}
        detailPanel={({ owner, status, ...data }: TaskData) => (
          <TaskDetails {...data} owner={owner.name} />
        )}
        actions={[
          {
            icon: () => <AddIcon />,
            tooltip: "Add Task",
            isFreeAction: true,
            onClick: () => {
              setRowData(undefined);
              setFormAction("create");
              setOpenForm(true);
            },
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Task",
            onClick: (_, oldData) => {
              setRowData(oldData as TaskData);
              setFormAction("update");
              setOpenForm(true);
            },
          },
        ]}
      />
      <TaskForm
        open={openForm}
        editData={rowData}
        onChange={onRowChange}
        onClose={(): void => setOpenForm(false)}
        action={formAction}
      />
    </>
  );
};

export default TaskManager;
export type { TaskData, UserInfo };
