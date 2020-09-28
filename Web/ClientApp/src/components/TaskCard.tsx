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
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { TaskData } from "../containers/Admin/TaskManager";
import {
  ExpandMore as ExpandMoreIcon,
  Create as EditIcon,
  InsertComment as CommentIcon,
  CheckBoxOutlineBlank as DoingIcon,
  CheckBox as DoneIcon,
  AssignmentLate as OverdueIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import PartnerShowcase from "./PartnerShowcase";
import ShowComment from "./ShowComment";

interface Props {
  data: TaskData;
  onEditClick: (data: TaskData) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      backgroundColor: "#FFFF88",
    },
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
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const TaskCard = ({ data, onEditClick }: Props): JSX.Element => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComment, setShowComment] = useState(false);

  return (
    <Card className={classes.card}>
      <CardHeader
        disableTypography
        title={
          <span style={{ fontWeight: "bold" }}>
            {data.title}&nbsp;
            {data.isPrivate && (
              <Chip
                color="secondary"
                variant="outlined"
                size="small"
                label="private"
                className={classes.chip}
              />
            )}
          </span>
        }
        subheader={
          <Typography color="textSecondary" variant="subtitle2">
            By&nbsp;
            <Chip
              size="small"
              color="secondary"
              label={data.owner.name}
              className={classes.chip}
            />
          </Typography>
        }
        action={
          <IconButton>
            {data.status === 1 ? (
              <DoneIcon style={{ color: "green" }} />
            ) : data.status === 0 ? (
              <DoingIcon />
            ) : (
              <OverdueIcon style={{ color: "red" }} />
            )}
          </IconButton>
        }
      />
      <CardContent>
        <em className={classes.timeText}>
          {new Date(data.startDate).toDateString()}&nbsp;-&nbsp;
          {new Date(data.endDate).toDateString()}
        </em>
        {!!data.partners.length && <PartnerShowcase data={data.partners} />}
      </CardContent>
      <CardActions disableSpacing>
        {data.status === 0 && (
          <IconButton onClick={(): void => onEditClick(data)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => setShowComment(true)}>
          <CommentIcon />
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
      <ShowComment
        open={showComment}
        onClose={() => setShowComment(false)}
        task={data}
      />
    </Card>
  );
};

export default TaskCard;
