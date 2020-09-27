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
import PartnerShowcase from "../../../components/PartnerShowcase";

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
        <PartnerShowcase data={props.partners} />
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
