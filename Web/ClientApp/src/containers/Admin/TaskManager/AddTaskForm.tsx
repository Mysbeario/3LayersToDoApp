import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Autocomplete } from "@material-ui/lab";

interface UserInfo {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTaskForm = (props: Props): JSX.Element => {
  const [users, setUser] = useState<UserInfo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/api/user");
      setUser(data);
    })();
  }, []);

  return (
    <Dialog {...props}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField label="Title" />
        <br />
        <TextField label="Description" multiline rows={4} variant="outlined" />
        <Autocomplete
          options={users}
          getOptionLabel={(option: UserInfo) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Owner" variant="outlined" />
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
