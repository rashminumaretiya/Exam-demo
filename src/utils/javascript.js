import { emailValidation } from "./regex";

const checkName = (value) => {
  if (value === "") {
    return "Please enter name";
  }
};
const checkEmail = (value) => {
  if (value === "") {
    return "Please enter email";
  } else if (!emailValidation(value)) {
    return "Email not valid";
  }
};
const passwordCheck = (value, skipPasswordsLengthValidation) => {
  if (value === "") {
    return "Please enter password";
  } else if (value.length < 6 && !skipPasswordsLengthValidation) {
    return "Please enter at least 6 characters";
  }
};
const confirmPasswordCheck = (value, password) => {
  if (value === "") {
    return "Please enter confirm password";
  } else if (password !== value) {
    return "Confirm password not match";
  }
};

const validation = (
  name,
  value,
  skipPasswordsLengthValidation = null,
  Password
) => {
  switch (name) {
    case "name":
      return checkName(value) || null;
    case "email":
      return checkEmail(value) || null;
    case "password":
    case "Password":
      return passwordCheck(value, skipPasswordsLengthValidation) || null;
    case "ConfirmPassword":
      return confirmPasswordCheck(value, Password) || null;
    default:
      return null;
  }
};

export default validation;
