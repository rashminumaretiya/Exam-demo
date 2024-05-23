import { Card, CardContent } from "@mui/material";
import React from "react";

const BSCard = ({ children, sx, ...props }) => {
  return (
    <Card
      sx={{
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        "& .MuiCardContent-root": { p: 2 },
        ...sx,
      }}
      {...props}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BSCard;
