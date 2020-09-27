import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import TableIcons from "../../../components/TableIcons";
import TaskDetails from "./TaskDetails";
import {
  Add as AddIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { taskState } from "../../state";
import TaskForm from "../../../components/TaskForm";

interface UserInfo {
  id: number;
  name: string;
}

interface TaskData {
  id: number;
  owner: UserInfo;
  partners: UserInfo[];
  title: string;
  description: string;
  status: number;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
}

const url = "/api/task";

const TaskManager = (): JSX.Element => {
  const [taskData, setTaskData] = useRecoilState(taskState);
  const [openForm, setOpenForm] = useState(false);
  const [rowData, setRowData] = useState<TaskData>();
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const onRowDelete = (oldData: TaskData): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}/${oldData.id}`);
      setTaskData(taskData.filter((d) => d.id !== oldData.id));
    })();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(url);
      setTaskData(data);
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
              new Date(rowData.startDate || Date.now()).toDateString(),
          },
          {
            title: "End Date",
            field: "endDate",
            initialEditValue: new Date().toISOString(),
            render: (rowData: TaskData) =>
              new Date(rowData.endDate || Date.now()).toDateString(),
          },
          {
            title: "Private",
            field: "isPrivate",
            initialEditValue: false,
            render: (rowData: TaskData) =>
              rowData.isPrivate ? (
                <CheckCircleIcon style={{ color: "green" }} />
              ) : (
                <CancelIcon style={{ color: "red" }} />
              ),
          },
        ]}
        data={taskData.map((d) => ({ ...d }))}
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
              const data = oldData as TaskData;
              data.startDate = data.startDate.substring(0, 10);
              data.endDate = data.endDate.substring(0, 10);
              setRowData(data as TaskData);
              setFormAction("update");
              setOpenForm(true);
            },
          },
        ]}
      />
      <TaskForm
        open={openForm}
        editData={rowData}
        onClose={(): void => setOpenForm(false)}
        action={formAction}
      />
    </>
  );
};

export default TaskManager;
export type { TaskData, UserInfo };
