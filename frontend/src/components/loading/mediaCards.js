import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

function Media() {
  return (
    <Box key={1} width={250} marginRight={0.5} my={5}>
      <Skeleton variant="rect" width={250} height={140} />
      <Box pt={0.5}>
        <Skeleton height={40} width="50%" />
        <br />
        <Skeleton width="60%" />
        <Skeleton width="60%" />
        <Skeleton width="60%" />
        <br />
        <Skeleton width="40%" />
      </Box>
    </Box>
  );
}

export default function YouTube() {
  return (
    <Box overflow="hidden">
      <Media />
    </Box>
  );
}
