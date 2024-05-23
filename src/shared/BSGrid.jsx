import { Grid } from "@mui/material";
import React from "react";

const BSGrid = ({ children, ...props }) => {
  return <Grid {...props}>{children}</Grid>;
};

export default BSGrid;
