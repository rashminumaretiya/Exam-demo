import React, { memo } from "react";
import BSButton from "../../shared/BSButton";
import BSStack from "../../shared/BSStack";
import BSTypography from "../../shared/BSTypography";
import BSFormField from "../../shared/BSFormField";
import LoginContainer from "../../container/login/login";
import BSForm from "../../shared/BSForm";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import BSCard from "../../shared/BSCard";

const Login = () => {
  const {
    loginField,
    handleLogin,
    handleChange,
    handleShowPassword,
    isLoading,
  } = LoginContainer();
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
          Login
        </BSTypography>
        <BSTypography
          color="secondary.dark"
          variant="body2"
          component="p"
          sx={{ mb: 3 }}
        >
          Please fill your detail to access your account.
        </BSTypography>
        <BSForm onSubmit={handleLogin}>
          <BSFormField
            list={loginField}
            onChange={handleChange}
            handleShowPasswordClick={handleShowPassword}
          />
          <BSTypography
            mb={1}
            sx={{
              textAlign: "right",
              "& a": { textDecoration: "none", color: "blue.main" },
            }}
          >
            <Link to="/forgot-password">Forgot Password</Link>
          </BSTypography>
          <BSButton disabled={isLoading} fullWidth type="submit">
            Login
            {isLoading && (
              <CircularProgress sx={{ ml: 2 }} size={16} color="black" />
            )}
          </BSButton>
          <BSTypography
            mt={1}
            sx={{ textAlign: "center", "& a": { color: "blue.main" } }}
          >
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </BSTypography>
        </BSForm>
      </BSCard>
    </BSStack>
  );
};

export default memo(Login);
