import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import PasswordHider from "../../../components/PasswordHider";
import TableIcons from "../../../components/TableIcons";

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
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
          initialEditValue: data.length + 1,
          editable: "never",
        },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
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
