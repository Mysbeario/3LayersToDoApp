import Axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import PasswordHider from "../../../components/PasswordHider";
import TableIcons from "../../../components/TableIcons";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
}

const getUsers = async (): Promise<UserData[]> => {
  const url = "/api/user";
  const { data } = await Axios.get(url);
  return data as UserData[];
};

const UserManager = (): JSX.Element => {
  const [data, setData] = useState<UserData[]>([]);

  const onRowAdd = (newData: UserData): Promise<void> =>
    (async () => {
      await Axios.post("/api/user", newData);
      setData([...data, newData]);
    })();

  const onRowUpdate = (newData: UserData, oldData?: UserData): Promise<void> =>
    (async () => {
      if (oldData) {
        let isDifferent = false;

        for (const k of Object.keys(newData)) {
          if (newData[k as keyof UserData] === oldData[k as keyof UserData]) {
            isDifferent = true;
            break;
          }
        }

        if (isDifferent) {
          await Axios.put("/api/user", newData);
          const updatedData = [...data];
          updatedData[data.indexOf(oldData)] = newData;
          setData(updatedData);
        }
      }
    })();

  const onRowDelete = (oldData: UserData): Promise<void> =>
    (async () => {
      await Axios.delete(`/api/user/${oldData.id}`);
      setData(data.filter((d) => d !== oldData));
    })();

  useEffect(() => {
    getUsers().then((data) => setData(data));
  }, []);

  return (
    <MaterialTable
      icons={TableIcons}
      title="User"
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
