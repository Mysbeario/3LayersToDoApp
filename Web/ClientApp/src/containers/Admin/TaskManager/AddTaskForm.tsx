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
  rowData?: TaskData;
  onChange: (newData: Omit<TaskData, "id">, oldData?: TaskData) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "grid",
      gridGap: "1rem",
    },
  })
);

const AddTaskForm = ({ rowData, onChange, ...props }: Props): JSX.Element => {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState(false);
  const [users, setUser] = useState<UserInfo[]>([]);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [owner, setOwner] = useState<UserInfo>();
  const [status, setStatus] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/api/user");
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    setTitle(rowData?.title);
    setDescription(rowData?.description);
    setOwner(rowData?.owner);
    setEndDate(rowData?.endDate);
    setStartDate(rowData?.startDate);
    setStatus(rowData?.status);
  }, [rowData]);

  const add = async (): Promise<void> => {
    if (!title || !description || !status || !owner || !startDate || !endDate) {
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

      if (!rowData) {
        Axios.post(url, data);
        onChange(data as TaskData);
      } else {
        Axios.put(url, { ...data, id: rowData?.id });
        onChange(data as TaskData, rowData);
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
              value={rowData?.title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
            />
          </FormControl>
          <FormControl>
            <TextField
              value={rowData?.description}
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Autocomplete
              value={rowData?.owner}
              options={users}
              getOptionLabel={(option: UserInfo) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Owner" variant="outlined" />
              )}
              onChange={(_, value: UserInfo | null) =>
                setOwner(value || { id: "", name: "" })
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              value={rowData?.status}
              onChange={(e) => setStatus(e.target.value as number)}
            >
              <MenuItem value={0}>To Do</MenuItem>
              <MenuItem value={1}>Doing</MenuItem>
              <MenuItem value={2}>Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              value={rowData?.startDate}
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
              value={rowData?.endDate}
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

export default AddTaskForm;
