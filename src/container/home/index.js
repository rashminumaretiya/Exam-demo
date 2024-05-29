import { useEffect, useState } from "react";
import { apiCall } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
  const [studentExam, setStudentExam] = useState();
  const [allStudent, setAllStudent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const role = JSON.parse(localStorage.getItem("loggedUserData"))?.role;
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();

  const getAllExam = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer("student/studentExam", "GET", null);
      if (response.data) {
        setStudentExam(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllStudent = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer("dashboard/Teachers", "GET", null);
      if (response.data) {
        setAllStudent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    role === "teacher" ? getAllStudent() : getAllExam();
  }, []);

  const handleExam = (id) => {
    navigate(`/student/examPaper?id=${id}`);
  };

  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (items.length >= allStudent.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items?.concat(Array.from({ length: 20 })));
    }, 500);
  };

  const handleStudentDetail = (id) => {
    navigate(`/dashboard/Teachers/viewStudentDetail?id=${id}`);
  };

  return {
    studentExam,
    isLoading,
    handleExam,
    allStudent,
    role,
    items,
    hasMore,
    fetchMoreData,
    handleStudentDetail,
  };
};

export default HomeContainer;
