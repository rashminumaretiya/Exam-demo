import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Close } from "../assets/icons/icon";
import Slide from "@mui/material/Slide";
import { DialogTitle } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BSModal = ({ children, onClose, dialogActions, ...props }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="customized-dialog-title"
      {...props}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {props.title}
        <IconButton sx={{ ml: "auto" }} aria-label="close" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default BSModal;
