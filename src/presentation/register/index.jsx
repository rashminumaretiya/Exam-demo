import React, { memo } from "react";
import BSButton from "../../shared/BSButton";
import BSStack from "../../shared/BSStack";
import BSTypography from "../../shared/BSTypography";
import BSFormField from "../../shared/BSFormField";
import BSForm from "../../shared/BSForm";
import { Link } from "react-router-dom";
import RegisterContainer from "../../container/register/register";
import { CircularProgress } from "@mui/material";
import BSCard from "../../shared/BSCard";

const Register = () => {
  const {
    registerField,
    handleRegister,
    handleChange,
    handleShowPassword,
    isLoading,
  } = RegisterContainer();
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
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Register
        </BSTypography>
        <BSTypography variant="body2" component="p" sx={{ mb: 3 }}>
          Please fill your detail to access your account.
        </BSTypography>
        <BSForm onSubmit={handleRegister}>
          <BSFormField
            list={registerField}
            onChange={handleChange}
            handleShowPasswordClick={handleShowPassword}
          />
          <BSButton fullWidth type="submit">
            Register
            {isLoading && (
              <CircularProgress sx={{ ml: 2 }} size={16} color="black" />
            )}
          </BSButton>
          <BSTypography
            mt={1}
            sx={{ textAlign: "center", "& a": { color: "blue.main" } }}
          >
            Already have an account <Link to="/login">Login</Link>
          </BSTypography>
        </BSForm>
      </BSCard>
    </BSStack>
  );
};

export default memo(Register);
