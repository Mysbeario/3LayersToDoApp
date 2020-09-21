import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable, { Column } from "material-table";
import TableIcons from "./TableIcons";

interface BaseData {
  id: string;
}

interface Props<Data extends BaseData> {
  title: string;
  columns: Column<Data>[];
  url: string;
  details?: (data: Data) => React.ReactNode;
}

const CategoryTable = <Data extends BaseData>({
  url,
  columns,
  title,
  details,
}: Props<Data>): JSX.Element => {
  const [data, setData] = useState<Data[]>([]);

  const onRowAdd = (newData: Data): Promise<void> =>
    (async () => {
      await Axios.post(url, newData);
      setData([...data, newData]);
    })();

  const onRowUpdate = (newData: Data, oldData?: Data): Promise<void> =>
    (async () => {
      if (oldData) {
        let isDifferent = false;

        // Check whether there is change in new data, if not then skip the api call
        for (const k of Object.keys(newData)) {
          if (newData[k as keyof Data] === oldData[k as keyof Data]) {
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

  const onRowDelete = (oldData: Data): Promise<void> =>
    (async () => {
      await Axios.delete(`${url}${oldData.id}`);
      setData(data.filter((d) => d !== oldData));
    })();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(url);
      setData(data as Data[]);
    })();
  }, []);

  return (
    <MaterialTable
      title={title}
      icons={TableIcons}
      columns={[
        {
          title: "ID",
          field: "id",
          initialEditValue: data.length + 1,
          editable: "never",
        },
        ...columns,
      ]}
      data={data}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
      detailPanel={details}
    />
  );
};

export default CategoryTable;
export type { BaseData };
