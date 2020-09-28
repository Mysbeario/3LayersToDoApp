import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import PasswordHider from "../../components/PasswordHider";
import TableIcons from "../../components/TableIcons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { UserInfo } from "./TaskManager";

interface CommentData {
  id: number;
  owner: UserInfo;
  task: number;
  content: string;
  date: string;
}

const url = "/api/comment";

const CommentManager = (): JSX.Element => {
  const [data, setData] = useState<CommentData[]>([]);
  const [users, setUser] = useState<UserInfo[]>([]);

  const onRowAdd = (newData: CommentData): Promise<void> =>
    (async () => {
      const { data: newIndex } = await Axios.post(url, newData);
      const { data: newUser } = await Axios.get(`${url}/${newIndex}`);
      setData([...data, newUser]);
    })();

  const onRowUpdate = (
    newData: CommentData,
    oldData?: CommentData
  ): Promise<void> =>
    (async () => {
      if (oldData) {
        let isDifferent = false;

        // Check whether there is change in new data, if not then skip the api call
        for (const k of Object.keys(newData)) {
          if (
            newData[k as keyof CommentData] === oldData[k as keyof CommentData]
          ) {
            isDifferent = true;
            break;
          }
        }

        if (isDifferent) {
          await Axios.put(url, newData);
          const updatedData = [...data];
          updatedData[data.indexOf(oldData)] = newData;
          setData(updatedData);
        }
      }
    })();

  const onRowDelete = (oldData: CommentData): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}/${oldData.id}`);
      setData(data.filter((d) => d !== oldData));
    })();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(url);
      setData(data);
    })();

    (async () => {
      const { data } = await Axios.get("/api/user");
      setUser(data);
    })();
  }, []);

  return (
    <MaterialTable
      title="Comments"
      icons={TableIcons}
      columns={[
        {
          title: "ID",
          field: "id",
          editable: "never",
        },
        {
          title: "Owner",
          field: "owner",
          render: (rowData) => rowData.owner.name,
          editComponent: (props) => (
            <Select
              defaultValue={parseInt(props.value?.id) || 0}
              onChange={(e) => props.onChange({ id: e.target.value as number })}
            >
              {users.map((u) => (
                <MenuItem value={u.id}>{u.name}</MenuItem>
              ))}
            </Select>
          ),
        },
        { title: "Task Id", field: "task", type: "numeric" },
        {
          title: "Content",
          field: "content",
        },
        {
          title: "Date",
          field: "date",
          render: (rowData) =>
            new Date(rowData.date || Date.now()).toDateString(),
          editComponent: (props) => (
            <TextField
              type="date"
              defaultValue={new Date(props.value?.date || Date.now())
                .toISOString()
                .substring(0, 10)}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        },
      ]}
      data={data}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
    />
  );
};

export default CommentManager;
export type { CommentData };
