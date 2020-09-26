import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

interface Props {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  owner: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: "1rem",
      backgroundColor: "#f5f5f5",
    },
  })
);

const TaskDetails = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={props.title} subheader={`By ${props.owner}`} />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
