import React from "react";
import Typography from "@mui/material/Typography";

const BSTypography = (props) => {
  return <Typography {...props}>{props?.children}</Typography>;
};

export default BSTypography;
