import { useState } from "react";
import validation from "../../utils/javascript";
import { InVisible, Visible } from "../../assets/icons/icon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api";

const RegisterContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState({});
  const registerField = [
    {
      type: "text",
      label: "Name",
      name: "name",
      value: formFields?.name,
      error: !!error?.name,
      helperText: error?.name,
    },
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
    {
      type: "select",
      label: "Role",
      name: "role",
      error: !!error?.role,
      helperText: error?.role,
      dropdownList: ["Student", "Teacher"],
      defaultValue: "Student",
      value: formFields?.role,
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErr = validation(name, value);
    setError((prev) => ({
      ...prev,
      [name]: newErr,
    }));
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async (e) => {
    let newErr = {};
    e.preventDefault();
    for (let key in formFields) {
      newErr[key] = validation(key, formFields[key]);
    }
    setError(newErr);
    const apiCall = async () => {
      try {
        const response = await ApiContainer("users/SignUp", "POST", formFields);
        if (response.data) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    if (!newErr?.email && !newErr.password) {
      apiCall();
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    registerField,
    handleRegister,
    handleChange,
    handleShowPassword,
    isLoading,
  };
};

export default RegisterContainer;
