import { makeStyles, createStyles, Chip } from "@material-ui/core";
import React from "react";
import { UserInfo } from "../containers/Admin/TaskManager";

interface Props {
  data: UserInfo[];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    chipArr: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      width: "max-content",
      maxWidth: "250px",
      padding: theme.spacing(0.5),
      marginTop: "1rem",
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const PartnerShowcase = ({ data }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.chipArr}>
      {data.map((p) => (
        <Chip
          size="small"
          color="primary"
          label={p.name}
          className={classes.chip}
        />
      ))}
    </div>
  );
};

export default PartnerShowcase;
