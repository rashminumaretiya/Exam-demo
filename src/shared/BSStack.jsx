import React from "react";
import Stack from "@mui/material/Stack";

const BSStack = (props) => {
  return (
    <Stack sx={props?.sx} {...props}>
      {props?.children}
    </Stack>
  );
};

export default BSStack;
