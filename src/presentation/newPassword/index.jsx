import React from "react";
import BSStack from "../../shared/BSStack";
import BSTypography from "../../shared/BSTypography";
import BSButton from "../../shared/BSButton";
import BSFormField from "../../shared/BSFormField";
import BSForm from "../../shared/BSForm";
import NewPasswordContainer from "../../container/newPassword";
import { CircularProgress } from "@mui/material";
import BSCard from "../../shared/BSCard";

const NewPassword = () => {
  const {
    passwordField,
    isLoading,
    handleSubmit,
    handleChange,
    handleShowPassword,
  } = NewPasswordContainer();
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
          Forgot Password
        </BSTypography>

        <BSForm onSubmit={handleSubmit}>
          <BSFormField
            list={passwordField}
            onChange={handleChange}
            handleShowPasswordClick={handleShowPassword}
          />

          <BSButton fullWidth type="submit">
            Change Password
            {isLoading && (
              <CircularProgress sx={{ ml: 2 }} size={16} color="black" />
            )}
          </BSButton>
        </BSForm>
      </BSCard>
    </BSStack>
  );
};

export default NewPassword;
