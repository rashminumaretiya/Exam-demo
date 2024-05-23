import { useEffect, useState } from "react";
import { apiCall } from "../../api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ViewStudentDetailContainer = () => {
  const [student, setStudent] = useState();
  const { ApiContainer } = apiCall();
  const location = useLocation();
  const getStudentDetail = async () => {
    try {
      const response = await ApiContainer(
        `dashboard/Teachers/viewStudentDetail${location.search}`,
        "GET",
        null
      );
      if (response?.data) {
        setStudent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getStudentDetail();
  }, []);

  return { student };
};

export default ViewStudentDetailContainer;
