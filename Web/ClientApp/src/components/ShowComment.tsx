import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { CommentData } from "../containers/Admin/CommentManager";
import { TaskData } from "../containers/Admin/TaskManager";
import { Comment as CommentIcon } from "@material-ui/icons";
import Axios from "axios";
import { useRecoilValue } from "recoil";
import { accountState } from "../containers/state";

interface Props {
  open: boolean;
  onClose: () => void;
  task: TaskData;
}

const ShowComment = (props: Props): JSX.Element => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [content, setContent] = useState("");
  const account = useRecoilValue(accountState);

  const sendComment = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const data = {
        owner: { id: account.id },
        task: props.task.id,
        content,
        date: new Date().toISOString(),
      };

      const { data: newIndex } = await Axios.post("/api/comment", data);
      const { data: newComment } = await Axios.get("/api/comment/" + newIndex);
      setComments([...comments, newComment]);
      setContent("");
    }
  };

  const deleteComment = async (id: number) => {
    await Axios.delete("/api/comment/" + id);
    setComments(comments.filter((c) => c.id !== id));
  };

  useEffect(() => {
    if (props.open) {
      (async () => {
        const { data } = await Axios.get("/api/comment/task/" + props.task.id);
        setComments(data);
      })();
    }
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {comments.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary">
            Nothing to be shown
          </Typography>
        ) : (
          comments.map((c) => (
            <Alert
              onClose={
                c.owner.id === account.id
                  ? () => deleteComment(c.id)
                  : undefined
              }
              severity="info"
              style={{ margin: "5px" }}
            >
              <AlertTitle>
                {c.owner.name}&nbsp;
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="textSecondary"
                >
                  {new Date(c.date).toISOString().substring(0, 10)}
                </Typography>
              </AlertTitle>
              {c.content}
            </Alert>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <TextField
          style={{ width: "100%" }}
          value={content}
          label="Say something"
          onKeyDown={sendComment}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CommentIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ShowComment;
