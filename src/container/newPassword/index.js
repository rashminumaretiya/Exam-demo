import React, { useState } from "react";
import { InVisible, Visible } from "../../assets/icons/icon";
import validation from "../../utils/javascript";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../api";
import { toast } from "react-toastify";

const NewPasswordContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();
  const [formField, setFromField] = useState({
    Password: "",
    ConfirmPassword: "",
  });
  const [error, setError] = useState({});
  const passwordField = [
    {
      type: showPassword ? "text" : "password",
      name: "Password",
      label: "New Password",
      value: formField?.Password,
      error: !!error?.Password,
      helperText: error?.Password,
      AdornmentIcon: showPassword ? <Visible /> : <InVisible />,
    },
    {
      type: showPassword ? "text" : "password",
      name: "ConfirmPassword",
      label: "Confirm Password",
      value: formField?.ConfirmPassword,
      error: !!error?.ConfirmPassword,
      helperText: error?.ConfirmPassword,
      AdornmentIcon: showPassword ? <Visible /> : <InVisible />,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: validation(name, value, false, formField.Password),
    }));
    setFromField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErr = {};
    for (let key in formField) {
      if (validation(key, formField[key], false, formField.Password)) {
        newErr[key] = validation(
          key,
          formField[key],
          false,
          formField.Password
        );
      }
    }
    setError(newErr);
    const apiCall = async () => {
      try {
        setIsLoading(true);
        const response = await ApiContainer(
          `users/ForgotPassword/Verify${location?.search}`,
          "POST",
          formField
        );
        if (response.data.data) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!Object.keys(newErr).length) {
      apiCall();
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    passwordField,
    isLoading,
    handleSubmit,
    handleChange,
    handleShowPassword,
  };
};

export default NewPasswordContainer;
