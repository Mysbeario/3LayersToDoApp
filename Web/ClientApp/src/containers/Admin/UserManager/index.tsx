import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import PasswordHider from "../../../components/PasswordHider";
import TableIcons from "../../../components/TableIcons";
import { MenuItem, Select } from "@material-ui/core";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
}

const url = "/api/user";

const UserManager = (): JSX.Element => {
  const [data, setData] = useState<UserData[]>([]);

  const onRowAdd = (newData: UserData): Promise<void> =>
    (async () => {
      await Axios.post(url, newData);
      setData([...data, newData]);
    })();

  const onRowUpdate = (newData: UserData, oldData?: UserData): Promise<void> =>
    (async () => {
      if (oldData) {
        let isDifferent = false;

        // Check whether there is change in new data, if not then skip the api call
        for (const k of Object.keys(newData)) {
          if (newData[k as keyof UserData] === oldData[k as keyof UserData]) {
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

  const onRowDelete = (oldData: UserData): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}${oldData.id}`);
      setData(data.filter((d) => d !== oldData));
    })();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(url);
      setData(data as UserData[]);
    })();
  }, []);

  return (
    <MaterialTable
      title="Users"
      icons={TableIcons}
      columns={[
        {
          title: "ID",
          field: "id",
          editable: "never",
        },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        {
          title: "Role",
          field: "role",
          initialEditValue: 0,
          lookup: { 0: "Staff", 1: "Manager" },
          editComponent: (props) => (
            <Select
              style={{ fontSize: "0.875rem" }}
              defaultValue={0}
              onChange={(e) => props.onChange(e.target.value)}
            >
              <MenuItem value={0}>Staff</MenuItem>
              <MenuItem value={1}>Manager</MenuItem>
            </Select>
          ),
        },
        {
          title: "Password",
          field: "password",
          render: (rowData: UserData) => (
            <PasswordHider value={rowData.password} />
          ),
        },
      ]}
      data={data}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
    />
  );
};

export default UserManager;
export type { UserData };
