import React from "react";
import { Skeleton } from "@material-ui/lab";

const Loading = (): JSX.Element => {
  return (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  );
};

export default Loading;
