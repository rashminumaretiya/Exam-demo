import { emailValidation } from "./regex";

const checkName = (name, value) => {
  if (value === "") {
    return `Please enter ${name}`;
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
const optionValidation = (name, value, optionMatch) => {
  if (value === "") {
    return `Please enter ${name}`;
  }
};

const validation = (
  name,
  value,
  skipPasswordsLengthValidation = null,
  Password,
  optionMatch
) => {
  switch (name) {
    case "name":
    case "question":
    case "answer":
    case "subjectName":
      return checkName(name, value) || null;
    case "email":
      return checkEmail(value) || null;
    case "password":
    case "Password":
      return passwordCheck(value, skipPasswordsLengthValidation) || null;
    case "ConfirmPassword":
      return confirmPasswordCheck(value, Password) || null;
    case "option1":
    case "option2":
    case "option3":
    case "option4":
      return optionValidation(name, value, optionMatch) || null;
    default:
      return null;
  }
};

export default validation;
