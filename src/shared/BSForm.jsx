import React from "react";

const BSForm = (props) => {
  return <form {...props}>{props.children}</form>;
};

export default BSForm;
