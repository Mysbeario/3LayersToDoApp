import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { TaskData, UserInfo } from ".";
import { Controller, useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Partial<TaskData>;
  onChange: (newData: TaskData, oldData?: TaskData) => void;
  forAdmin?: boolean;
  action: "create" | "update";
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "grid",
      gridGap: "1rem",
    },
  })
);

const TaskForm = ({
  editData,
  onChange,
  forAdmin = true,
  action,
  ...props
}: Props): JSX.Element => {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm<TaskData>();
  const [users, setUser] = useState<UserInfo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/api/user");
      setUser(data);
    })();
  }, []);

  const add = async (data: TaskData): Promise<void> => {
    const url = "/api/task";
    console.table(data);

    if (action === "create") {
      const { data: lastId } = await Axios.post(url, data);
      const { data: newData } = await Axios.get(`${url}/${lastId}`);
      onChange(newData);
    } else {
      await Axios.put(url, { ...data, id: editData?.id });
      const { data: newData } = await Axios.get(`${url}/${editData?.id}`);
      onChange(newData, editData as TaskData);
    }
    props.onClose();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit(add)}>
        <DialogContent className={classes.form}>
          <TextField
            defaultValue={editData?.title}
            name="title"
            inputRef={register({ required: true })}
            label="Title"
            error={!!errors.title}
            helperText="Required"
          />
          <TextField
            defaultValue={editData?.description}
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            inputRef={register({ required: true })}
            error={!!errors.description}
            helperText="Required"
          />
          {forAdmin && (
            <>
              <FormControl>
                <InputLabel>Owner</InputLabel>
                <Controller
                  as={
                    <Select error={!!errors.owner?.id}>
                      {users.map((u) => (
                        <MenuItem value={u.id}>{u.name}</MenuItem>
                      ))}
                    </Select>
                  }
                  name="owner.id"
                  rules={{ required: "Required" }}
                  control={control}
                  defaultValue={editData?.owner?.id}
                />
                {errors.owner?.id && <FormHelperText>Required</FormHelperText>}
              </FormControl>
              <FormControl>
                <InputLabel>Status</InputLabel>
                <Controller
                  as={
                    <Select error={!!errors.status}>
                      <MenuItem value={0}>Doing</MenuItem>
                      <MenuItem value={1}>Done</MenuItem>
                    </Select>
                  }
                  name="status"
                  control={control}
                  rules={{ required: "Required" }}
                  defaultValue={editData?.status || 0}
                />
                {errors.status && <FormHelperText>Required</FormHelperText>}
              </FormControl>
            </>
          )}
          <TextField
            defaultValue={editData?.startDate}
            label="Start Date"
            type="datetime-local"
            name="startDate"
            inputRef={register({ required: true })}
            error={!!errors.startDate}
            helperText="Required"
          />
          <TextField
            defaultValue={editData?.endDate}
            label="End Date"
            type="datetime-local"
            name="endDate"
            inputRef={register({ required: true })}
            error={!!errors.endDate}
            helperText="Required"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
