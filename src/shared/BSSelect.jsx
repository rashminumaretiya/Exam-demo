import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Select,
} from "@mui/material";
import React from "react";

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 6,
  "&.MuiInputBase-root": {
    "& .MuiSelect-select": {
      height: 40,
      boxSizing: "border-box",
      "&:focus": {
        backgroundColor: "transparent",
      },
      "& .MuiMenuItem-root": {
        padding: 0,
        fontSize: 14,
        height: "100%",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
    "&.Mui-disabled": {
      "& .MuiSelect-select": {
        backgroundColor: "rgba(0, 0, 0, 0.07)",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
  },
  "&:before, &:after": {
    content: "normal",
  },
  "& .MuiSelect-select": {
    padding: "10px 12px",
    fontSize: 14,
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.main,
  },
  '& [aria-expanded="true"] +': {
    "& input + svg": {
      transform: "rotate(180deg)",
    },
  },
  "&.MuiOutlinedInput-root": {
    backgroundColor: theme.palette.white.main,
    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const BSSelect = ({
  onChange,
  value,
  label,
  children,
  defaultValue,
  ...props
}) => {
  return (
    <FormGroup sx={{ mb: 2 }}>
      {label && <FormLabel sx={{ fontSize: 14, mb: 0.5 }}>{label}</FormLabel>}
      <FormControl error={props.error} fullWidth>
        <StyledSelect
          value={value ? value : defaultValue}
          onChange={onChange}
          variant="outlined"
          defaultValue={defaultValue}
          {...props}
        >
          {children}
        </StyledSelect>
        <FormHelperText sx={{ mx: 0 }}>{props.helperText}</FormHelperText>
      </FormControl>
    </FormGroup>
  );
};

export default BSSelect;
