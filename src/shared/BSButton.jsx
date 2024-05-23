import React from "react";
import Button from "@mui/material/Button";

const BSButton = ({ children, ...props }) => {
  return (
    <Button disableElevation variant="contained" {...props}>
      {children}
    </Button>
  );
};

export default BSButton;
