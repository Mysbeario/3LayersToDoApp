import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { UserInfo } from ".";

interface Props {
  title: string;
  description: string;
  owner: string;
  partners: UserInfo[];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "1rem",
      backgroundColor: "#f5f5f5",
    },
    chipArr: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
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
        <Paper component="ul" className={classes.chipArr}>
          {props.partners.map((p) => (
            <Chip label={p.name} className={classes.chip} />
          ))}
        </Paper>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
