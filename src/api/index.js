import axios from "axios";

export const apiCall = () => {
  const userData = JSON.parse(localStorage.getItem("loggedUserData"));
  const ApiContainer = (URL, method, payload, config) =>
    new Promise((resolve, reject) => {
      const headers = {
        "access-token": userData?.token,
        ...config,
      };
      axios(`${process.env.REACT_APP_API_URL}/${URL}`, {
        method: method,
        headers,
        data: payload,
      })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  return {
    ApiContainer,
  };
};
