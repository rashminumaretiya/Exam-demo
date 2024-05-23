import { useState } from "react";
import validation from "../../utils/javascript";
import { toast } from "react-toastify";
import { apiCall } from "../../api";

const ForgotPasswordContainer = () => {
  const [formField, setFormField] = useState({ email: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { ApiContainer } = apiCall();
  const ForgotField = [
    {
      type: "text",
      label: "Email",
      name: "email",
      error: !!error.email,
      helperText: error?.email,
      value: formField?.email,
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: validation(name, value),
    }));
    setFormField((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = (e) => {
    const apiCall = async () => {
      setIsLoading(true);
      try {
        const response = await ApiContainer(
          "users/ForgotPassword",
          "POST",
          formField
        );
        if (response?.data?.data) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    let newErr = {};
    e.preventDefault();
    for (let key in formField) {
      if (validation(key, formField[key], true)) {
        newErr[key] = validation(key, formField[key], true);
      }
    }
    setError(newErr);
    if (!Object.keys(newErr).length) {
      apiCall();
    }
  };

  return {
    handleForgotPassword,
    ForgotField,
    handleChange,
    isLoading,
  };
};

export default ForgotPasswordContainer;
