import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert, Autocomplete } from "@material-ui/lab";
import { TaskData, UserInfo } from ".";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Partial<TaskData>;
  onChange: (newData: Omit<TaskData, "id">, oldData?: TaskData) => void;
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
  const [submitError, setSubmitError] = useState(false);
  const [users, setUser] = useState<UserInfo[]>([]);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [owner, setOwner] = useState<UserInfo>();
  const [status, setStatus] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/api/user");
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    setTitle(editData?.title);
    setDescription(editData?.description);
    setOwner(editData?.owner);
    setEndDate(editData?.endDate);
    setStartDate(editData?.startDate);
    setStatus(editData?.status || 0);
  }, [editData]);

  const add = async (): Promise<void> => {
    console.table([title, description, status, owner, startDate, endDate]);
    if (!title || !description || !owner || !startDate || !endDate) {
      setSubmitError(true);
    } else {
      const data = {
        title,
        description,
        status,
        owner,
        startDate,
        endDate,
      };
      const url = "/api/task";

      if (action === "create") {
        Axios.post(url, data);
        onChange(data);
      } else {
        Axios.put(url, { ...data, id: editData?.id });
        onChange(data, editData as TaskData);
      }
      props.onClose();
    }
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <FormGroup className={classes.form}>
          <FormControl>
            <TextField
              defaultValue={editData?.title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
            />
          </FormControl>
          <FormControl>
            <TextField
              defaultValue={editData?.description}
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          {forAdmin && (
            <>
              <FormControl>
                <Autocomplete
                  defaultValue={editData?.owner}
                  options={users}
                  getOptionLabel={(option: UserInfo) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Owner" variant="outlined" />
                  )}
                  onChange={(_, value: UserInfo | null) =>
                    setOwner(value || { id: 0, name: "" })
                  }
                />
              </FormControl>
              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={editData?.status || 0}
                  onChange={(e) => setStatus(e.target.value as number)}
                >
                  <MenuItem value={0}>Doing</MenuItem>
                  <MenuItem value={1}>Done</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <FormControl>
            <TextField
              defaultValue={editData?.startDate}
              label="Start Date"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setStartDate(new Date(e.target.value).toISOString())
              }
            />
          </FormControl>
          <FormControl>
            <TextField
              defaultValue={editData?.endDate}
              label="End Date"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setEndDate(new Date(e.target.value).toISOString())
              }
            />
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={add} color="primary">
          Confirm
        </Button>
      </DialogActions>
      <Snackbar
        open={submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError(false)}
      >
        <Alert onClose={() => setSubmitError(false)} severity="error">
          All fields must be filled!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default TaskForm;
