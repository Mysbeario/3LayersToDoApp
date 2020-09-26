import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
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
  })
);

const TaskCard = ({ data, onEditClick }: Props): JSX.Element => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader
        title={data.title}
        subheader={`By ${data.owner.name}`}
        action={
          <IconButton>
            {data.status ? <CheckIcon /> : <UncheckIcon />}
          </IconButton>
        }
      />
      <CardContent>
        <em className={classes.timeText}>
          {new Date(data.startDate).toDateString()}&nbsp;-&nbsp;
          {new Date(data.endDate).toDateString()}
        </em>
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
