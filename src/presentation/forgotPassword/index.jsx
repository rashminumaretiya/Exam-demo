import React from "react";
import BSTypography from "../../shared/BSTypography";
import BSButton from "../../shared/BSButton";
import { CircularProgress } from "@mui/material";
import BSFormField from "../../shared/BSFormField";
import BSForm from "../../shared/BSForm";
import ForgotPasswordContainer from "../../container/forgotPassword";
import BSStack from "../../shared/BSStack";
import BSCard from "../../shared/BSCard";

const ForgotPassword = () => {
  const { handleForgotPassword, ForgotField, handleChange, isLoading } =
    ForgotPasswordContainer();
  return (
    <BSStack
      sx={{
        maxWidth: 400,
        mx: "auto",
        minHeight: "100vh",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <BSCard>
        <BSTypography
          variant="h5"
          component="h5"
          sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 3 }}
        >
          Forgot PAssword
        </BSTypography>

        <BSForm onSubmit={handleForgotPassword}>
          <BSFormField list={ForgotField} onChange={handleChange} />

          <BSButton fullWidth type="submit">
            Submit Email
            {isLoading && (
              <CircularProgress sx={{ ml: 2 }} size={16} color="black" />
            )}
          </BSButton>
        </BSForm>
      </BSCard>
    </BSStack>
  );
};

export default ForgotPassword;
