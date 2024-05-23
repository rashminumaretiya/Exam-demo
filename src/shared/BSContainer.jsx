import { Container } from "@mui/material";
import React from "react";

const BSContainer = ({ ...props }) => {
  return <Container maxWidth="xl">{props.children}</Container>;
};

export default BSContainer;
