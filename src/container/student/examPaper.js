import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExamPaperContainer = () => {
  const param = useLocation();
  const [examPaper, setExamPaper] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [ansList, setAnsList] = useState([]);
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();
  const [isLoading, setIsLoading] = useState(false);

  const getExamPaper = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer(
        `student/examPaper${param.search}`,
        "GET",
        null
      );
      if (response.data) {
        setExamPaper(response.data.data);
      }
      if (response.data.statusCode === 500) {
        setStatus(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (activeStep < examPaper.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newVal = { question: name, answer: value };
    setAnsList((prev) => [...prev, newVal]);
  };

  const handleSubmitExam = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer(
        `student/giveExam${param.search}`,
        "POST",
        ansList
      );
      if (response.data.statusCode === 200) {
        setStatus(response.data.message);
      } else if (response.data.statusCode === 500) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    getExamPaper();
  }, []);
  return {
    examPaper,
    handleNextQuestion,
    activeStep,
    handleChange,
    ansList,
    handleSubmitExam,
    status,
    handleRedirect,
    isLoading,
  };
};

export default ExamPaperContainer;
