import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { TaskData } from "../containers/Admin/TaskManager";
import {
  ExpandMore as ExpandMoreIcon,
  Create as CreateIcon,
  InsertComment as CommentIcon,
  CheckBoxOutlineBlank as UncheckIcon,
  CheckBox as CheckIcon,
  RemoveCircle as RemoveIcon,
} from "@material-ui/icons";
import clsx from "clsx";

interface Props {
  data: TaskData;
  onEditClick: (data: TaskData) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    timeText: {
      fontSize: "12px",
      color: "#474747",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    chipArr: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      width: "max-content",
      padding: theme.spacing(0.5),
      marginTop: "1rem",
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const TaskCard = ({ data, onEditClick }: Props): JSX.Element => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader
        title={data.title}
        subheader={
          <>
            By{" "}
            <Chip
              color="secondary"
              label={data.owner.name}
              className={classes.chip}
            />
          </>
        }
        action={
          <IconButton>
            {data.status ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <UncheckIcon />
            )}
          </IconButton>
        }
      />
      <CardContent>
        <em className={classes.timeText}>
          {new Date(data.startDate).toDateString()}&nbsp;-&nbsp;
          {new Date(data.endDate).toDateString()}
        </em>
        <Paper component="ul" className={classes.chipArr}>
          {data.partners.map((p) => (
            <Chip color="primary" label={p.name} className={classes.chip} />
          ))}
        </Paper>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={(): void => onEditClick(data)}>
          <CreateIcon />
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <RemoveIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>{data.description}</CardContent>
      </Collapse>
    </Card>
  );
};

export default TaskCard;
