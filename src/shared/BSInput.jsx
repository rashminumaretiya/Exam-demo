import React from "react";
import { FormGroup, FormLabel, TextField as TF } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const TextField = styled(TF)(({ theme }) => ({
  marginTop: 0,
  marginBottom: 0,
  "& .MuiInputBase-root": {
    borderRadius: 6,
    overflow: "hidden",
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.07)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
    },
    "& .MuiInputBase-input": {
      padding: "10px 14px",
      fontSize: 14,
      [theme.breakpoints.down("sm")]: {
        padding: "10px 14px",
      },
      "&.MuiInputBase-inputMultiline": {
        resize: "none",
      },
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &[type="number"]':
        {
          WebkitAppearance: "none",
          MozAppearance: "textfield",
        },
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
        {
          WebkitBoxShadow: `0 0 0px 40rem ${theme.palette.secondary.main} inset`,
          borderRadius: 6,
        },
      "&::-webkit-input-placeholder": {
        color: theme.palette.secondary.main,
        opacity: 1,
      },
      "&:-ms-input-placeholder": {
        color: theme.palette.secondary.main,
        opacity: 1,
      },
      "&::placeholder": {
        color: theme.palette.secondary.main,
        opacity: 1,
      },
    },
    "& legend": {
      lineHeight: 0,
    },
    "&:before, &:after": {
      content: "normal",
    },
    "&.MuiInputBase-multiline": {
      padding: 0,
      "& textarea": {
        resize: "vertical",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "& svg": {
      width: 15,
      height: 15,
      verticalAlign: "middle",
    },
    "&.Mui-error": {
      position: "inherit",
      top: "100%",
      left: 0,
      right: 0,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      top: 0,
    },
  },
}));

const BSInput = ({
  label,
  AdornmentIcon,
  handleShowPasswordClick,
  ...props
}) => {
  return (
    <FormGroup sx={{ mb: 2 }}>
      {label && <FormLabel sx={{ fontSize: 14, mb: 0.5 }}>{label}</FormLabel>}
      <TextField
        variant="outlined"
        {...props}
        InputProps={{
          endAdornment: AdornmentIcon && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleShowPasswordClick}
              >
                {AdornmentIcon}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormGroup>
  );
};

export default BSInput;
