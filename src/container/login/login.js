import { useState } from "react";
import validation from "../../utils/javascript";
import { InVisible, Visible } from "../../assets/icons/icon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api";

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();
  const loginField = [
    {
      type: "text",
      label: "Email",
      name: "email",
      value: formFields?.email,
      error: !!error?.email,
      helperText: error?.email,
    },
    {
      type: showPassword ? "text" : "password",
      label: "Password",
      name: "password",
      value: formFields?.password,
      error: !!error?.password,
      helperText: error?.password,
      AdornmentIcon: showPassword ? <Visible /> : <InVisible />,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErr = validation(name, value, true);
    setError((prev) => ({
      ...prev,
      [name]: newErr,
    }));
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = (e) => {
    let newErr = {};
    e.preventDefault();
    for (let key in formFields) {
      if (validation(key, formFields[key], true)) {
        newErr[key] = validation(key, formFields[key], true);
      }
    }
    setError(newErr);
    const apiCall = async () => {
      setIsLoading(true);
      try {
        const response = await ApiContainer("users/Login", "POST", formFields);
        if (response.data.data) {
          toast.success(response.data.message);
          localStorage.setItem(
            "loggedUserData",
            JSON.stringify(response.data.data)
          );
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch {
        toast.error("Something went wrong");
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
    loginField,
    handleLogin,
    handleChange,
    handleShowPassword,
    isLoading,
  };
};

export default LoginContainer;
